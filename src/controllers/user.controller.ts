// TODO make code organized properly - split with services
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import User from '../models/user.model';
import { IUser } from '../models/types/index';
import uploadOnCloudinary from '../utils/cloudinary';
import ApiResponse from '../utils/apiResponse';
import { isAvatarRequired } from '../config';
import { SignInSchema, SignUpSchema } from '../validations/user';

type FileType =
  | Record<string, Express.Multer.File[]>
  | Express.Multer.File[]
  | undefined;

const generateTokens = async (user: IUser) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch {
    throw new ApiError(400, 'Something went wrong!!');
  }
};

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  // Extract Details from the request body
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  // Validate the request body
  SignUpSchema.parse({ firstName, lastName, email, password, phoneNumber });

  // Check if the user already exists
  const isExistedUser = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  });
  if (isExistedUser) {
    throw new ApiError(409, 'User with phone number or email already exist');
  }

  // Upload the avatar to cloudinary
  const files: FileType = req.files;
  let avatar = null;
  const isAvatarMissing = !files || Array.isArray(files) || !files.avatar;
  if (isAvatarRequired && isAvatarMissing) {
    throw new ApiError(409, 'Avatar not found');
  }
  if (!isAvatarMissing && isAvatarRequired) {
    const avatarLocalPath = files.avatar[0]?.path;
    avatar = await uploadOnCloudinary(avatarLocalPath);
  }

  // Create a new user
  const newUser = await User.create({
    firstName,
    lastName,
    avatar: avatar?.url,
    email,
    password,
    phoneNumber,
  });

  // Check if the user is created successfully
  const createdUser = await User.findById(newUser._id)
    .select('-password -refreshToken -__v')
    .lean()
    .exec();

  if (!createdUser) {
    throw new ApiError(
      500,
      'Something went wrong while registering the user!!'
    );
  }

  // TODO - Redirect user to login page after successful registration with email in the query params
  return res
    .status(201)
    .send(new ApiResponse(201, 'User created sucessfully!!', email));
});

const loginUser = asyncHandler(async (req, res) => {
  // Extract Details from the request body
  const { email, password } = req.body;

  // Validate the request body
  SignInSchema.parse({ email, password });

  // Check if the user exists
  const loggedInUser = await User.findOne({ email });
  if (!loggedInUser) {
    throw new ApiError(400, 'Invalid credentials!!');
  }
  // Check if the password is correct
  const isPasswordValid = await loggedInUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid credentials!!');
  }

  // Generate the tokens
  const { accessToken, refreshToken } = await generateTokens(loggedInUser);
  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', accessToken, options)
    .json({ accessToken, refreshToken });
});

const logoutUser = asyncHandler(async (req, res) => {
  // Check if the user is logged in
  const loggedInUser = req.user;
  if (!loggedInUser) {
    throw new ApiError(401, 'Unauthorized request');
  }

  // Clear refreshToken from the user
  loggedInUser.refreshToken = null;
  await loggedInUser.save();
  return res
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .status(200)
    .json({ message: 'Logged out successfully and cookies cleared!' });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const usersRefreshToken = req.cookies?.refreshToken;
  if (!usersRefreshToken) {
    throw new ApiError(401, 'Unauthorized request!!');
  }

  // Verify the refresh token expiry
  const decodedToken = jwt.verify(
    usersRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as { [key: string]: string | number };

  // Get the requested user details
  const requestedUser = await User.findById(decodedToken._id).select(
    '-password'
  );

  // Verify the requested user details
  if (
    !requestedUser ||
    !requestedUser.refreshToken ||
    requestedUser.refreshToken !== usersRefreshToken
  ) {
    throw new ApiError(401, 'Unauthorized request!!');
  }

  // Generate new set of tokens
  const { refreshToken, accessToken } = await generateTokens(requestedUser);

  // Save the new refresh token in DB
  requestedUser.refreshToken = refreshToken;
  await requestedUser.save();

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', accessToken, options)
    .json({ accessToken, refreshToken });
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
