import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import { assessmentRepository } from '../repositories/index';

const createAssessment = asyncHandler(async (req, res) => {
  const { classroomId, assessments } = req.body;

  if (!classroomId || !assessments || !Array.isArray(assessments)) {
    throw new ApiError(400, 'Invalid Details !!');
  }

  await assessmentRepository.addAssessment(classroomId, assessments);

  return res
    .status(200)
    .json({ success: true, message: 'Assessment added successfully' });
});

const deleteAssessment = asyncHandler(async (req, res) => {
  const { classroomId, assessmentId } = req.body;

  if (!classroomId || !assessmentId) {
    throw new ApiError(400, 'Invalid Details !!');
  }

  await assessmentRepository.deleteAssessment(classroomId, assessmentId);

  return res
    .status(200)
    .json({ success: true, message: 'Assessment deleted successfully' });
});

const getAllAssessments = asyncHandler(async (req, res) => {
  const { classroomId } = req.body;

  if (!classroomId) {
    throw new ApiError(400, 'ClassroomId is required !!');
  }

  const assessments = await assessmentRepository.getAssessments(classroomId);

  return res.status(200).json({ success: true, data: assessments });
});

export { createAssessment, getAllAssessments, deleteAssessment };
