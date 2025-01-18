import mongoose from 'mongoose';
import Classroom from '../models/classroom.model';
import User from '../models/user.model';
import UserClassEnrollment from '../models/userClassEnrollment.model';
import { ClassroomType } from '../validations/classroom';
import ApiError from '../utils/apiError';
import { getMaxCountOfClassrooms } from './utils.repository';

export const createClassroom = async (
  userId: string,
  { title, description, academicYear, startDate, endDate }: ClassroomType
) => {
  // Check if user has reached their classroom creation limit
  const classroomCount = await UserClassEnrollment.countDocuments({ userId });
  const maxClassrooms = await getMaxCountOfClassrooms();

  if (classroomCount >= maxClassrooms) {
    throw new ApiError(
      400,
      'You have reached the maximum number of classrooms you can create.'
    );
  }

  // Create the classroom
  const newClassroom = await Classroom.create({
    title,
    description,
    academicYear,
    startDate,
    endDate,
  });

  // Map the user to the classroom
  await UserClassEnrollment.create({ userId, classroomId: newClassroom._id });

  return newClassroom;
};

export const getCreatedClassrooms = async (userId: string) => {
  return await UserClassEnrollment.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'classrooms',
        localField: 'classroomId',
        foreignField: '_id',
        as: 'classroomDetails',
      },
    },
    { $unwind: '$classroomDetails' },
    {
      $project: {
        _id: 0,
        id: '$classroomDetails._id',
        title: '$classroomDetails.title',
        description: '$classroomDetails.description',
        academicYear: '$classroomDetails.academicYear',
        startDate: '$classroomDetails.startDate',
        endDate: '$classroomDetails.endDate',
      },
    },
  ]);
};

export const addUserToClassroom = async (
  classroomId: string,
  requestedUserId: string
) => {
  const classroomObjectId = new mongoose.Types.ObjectId(classroomId);
  const userObjectId = new mongoose.Types.ObjectId(requestedUserId);

  // Check if classroom exists
  const classroom = await Classroom.findById(classroomObjectId);
  if (!classroom) throw new ApiError(404, 'Classroom not found.');

  // Check if user exists
  const user = await User.findById(userObjectId);
  if (!user) throw new ApiError(404, 'User not found.');

  // Check if user is already enrolled
  const existingEnrollment = await UserClassEnrollment.findOne({
    userId: userObjectId,
    classroomId: classroomObjectId,
  });

  if (existingEnrollment) {
    throw new ApiError(409, 'User is already enrolled in this classroom.');
  }

  // Enroll user in the classroom
  await UserClassEnrollment.create({
    userId: userObjectId,
    classroomId: classroomObjectId,
  });
};
