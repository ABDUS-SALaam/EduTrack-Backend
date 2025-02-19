import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';
import User from '../models/user.model';
import { IUser } from 'models/types';

// Verify the JWT token
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken || !refreshToken) {
    return next(new ApiError(401, 'Unauthorized request !!'));
  }

  try {
    // Verify the refresh token expiry
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    // Verify the access token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { [key: string]: string | number };

    // Get the requested user details
    const requestedUser = await User.findById(decodedToken._id).select(
      '-password'
    );

    // Check if the user exists and refresh token matches
    if (
      !requestedUser ||
      !requestedUser.refreshToken ||
      requestedUser.refreshToken !== refreshToken
    ) {
      return next(new ApiError(401, 'Unauthorized request !!'));
    }

    // Set the verified user details in the request
    req.user = requestedUser as IUser;

    next();
  } catch {
    // Todo - If error is due to expired accessToken then create a new accessToken
    return next(new ApiError(401, 'Invalid token or expired token'));
  }
};

// Todo
