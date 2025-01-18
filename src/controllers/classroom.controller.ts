import asyncHandler from '../utils/asyncHandler';
import { classroomSchema } from '../validations/classroom';
import { classroomRepository } from '../repositories/index';
import ApiError from '../utils/apiError';

export const createClassroom = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, 'Unauthorized request !!');

  const { title, description, academicYear, startDate, endDate } = req.body;

  // Validate request body
  classroomSchema.parse({
    title,
    description,
    academicYear,
    startDate,
    endDate,
  });

  const userId = (req.user._id || '') as string;

  // Call service to create classroom
  const newClassroom = await classroomRepository.createClassroom(userId, {
    title,
    description,
    academicYear,
    startDate,
    endDate,
  });

  return res.status(201).json({
    success: true,
    data: newClassroom,
  });
});

export const getCreatedClassrooms = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, 'Unauthorized request!');

  const userId = (req.user._id || '') as string;
  // Call service to get classrooms created by the user
  const classrooms = await classroomRepository.getCreatedClassrooms(userId);

  return res.status(200).json({
    message: 'Classrooms retrieved successfully.',
    classrooms,
  });
});

export const addUserToClassroom = asyncHandler(async (req, res) => {
  const { classroomId, requestedUserId } = req.body;

  if (!classroomId || !requestedUserId) {
    throw new ApiError(400, 'ClassroomId and RequestedUserId are required.');
  }

  // Call service to add a user to the classroom
  await classroomRepository.addUserToClassroom(classroomId, requestedUserId);

  return res.status(201).json({
    success: true,
    message: 'User successfully added to the classroom.',
  });
});
