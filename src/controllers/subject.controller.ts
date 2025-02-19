import ApiError from '../utils/apiError';
import asyncHandler from '../utils/asyncHandler';
import { subjectRepository } from '../repositories/index';
import { subjectsArraySchema } from '../validations/subject';

const addSubject = asyncHandler(async (req, res) => {
  const { subjects, classroomId } = req.body;

  if (!subjects || !classroomId) {
    throw new ApiError(400, 'Subjects and classroomId are required.');
  }

  subjectsArraySchema.parse(subjects);

  await subjectRepository.addSubjects(classroomId, subjects);

  return res
    .status(201)
    .json({ success: true, message: 'Subjects added successfully' });
});
const getSubjects = asyncHandler(async (req, res) => {
  const { classroomId } = req.body;

  if (!classroomId) {
    throw new ApiError(400, 'ClassroomId is required.');
  }

  const subjects = await subjectRepository.getSubjects(classroomId);

  return res.status(200).json({ success: true, data: subjects });
});
const deleteSubjects = asyncHandler(async (req, res) => {
  const { classroomId, subjectsId } = req.body;

  if (!classroomId || !subjectsId || !Array.isArray(subjectsId)) {
    throw new ApiError(400, 'Invalid Details !!');
  }

  await subjectRepository.deleteSubjects(classroomId, subjectsId);

  return res
    .status(200)
    .json({ success: true, message: 'Subjects deleted successfully' });
});
export { addSubject, getSubjects, deleteSubjects };
