import mongoose from 'mongoose';
import { SchemaNames } from '../constants';
import ApiError from '../utils/apiError';

const validateAndParseClassroomIds = async (classroomId: string) => {
  const parsedClassroomId = new mongoose.Types.ObjectId(classroomId);
  const classroom = await mongoose
    .model(SchemaNames.Classroom)
    .findById(parsedClassroomId);
  if (!classroom) throw new ApiError(400, 'Classroom not found.');
  return parsedClassroomId;
};
const validateAndParseAssessmentIds = async (
  parsedClassroomId: mongoose.Types.ObjectId,
  assessmentIds: string[]
) => {
  const parsedAssessmentIds = assessmentIds.map((assessmentId) => {
    return new mongoose.Types.ObjectId(assessmentId);
  });
  const assessments = await mongoose.model(SchemaNames.Assessment).find({
    _id: { $in: parsedAssessmentIds },
    classroomId: parsedClassroomId,
  });
  if (assessments.length !== assessmentIds.length) {
    throw new ApiError(400, 'One or more assessments not found.');
  }
  return parsedAssessmentIds;
};
const validateAndParseSubjectIds = async (
  classroomId: mongoose.Types.ObjectId,
  subjectIds: string[]
) => {
  const parsedSubjectIds = subjectIds.map((subjectId) => {
    return new mongoose.Types.ObjectId(subjectId);
  });
  const subjects = await mongoose
    .model(SchemaNames.SubjectClassEnrollment)
    .find({
      subjectId: { $in: parsedSubjectIds },
      classroomId,
    });
  if (subjects.length !== subjectIds.length) {
    throw new ApiError(400, 'One or more subjects not found.');
  }
  return parsedSubjectIds;
};
const getMaxAssessmentCount = async (): Promise<number> => {
  //   TODO - Implement the logic to get the maximum number of assessments a user can create
  const result = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(6);
    }, 1000);
  });
  return result;
};

const getMaxCountOfClassrooms = async (): Promise<number> => {
  //   TODO - Implement the logic to get the maximum number of classrooms a user can create
  const result = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(5);
    }, 1000);
  });
  return result;
};

export {
  validateAndParseClassroomIds,
  getMaxAssessmentCount,
  getMaxCountOfClassrooms,
  validateAndParseAssessmentIds,
  validateAndParseSubjectIds,
};

// Todo
