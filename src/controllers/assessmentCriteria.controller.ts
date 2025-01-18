import { z } from 'zod';
import asyncHandler from '../utils/asyncHandler';
import { assessmentCriteriaArraySchema } from '../validations/assessmentCriteria';
import { assessmentCriteriaRepository } from '../repositories/index';
import { stringArraySchema } from '../validations/utils';
const addAssessmentCriteria = asyncHandler(async (req, res) => {
  const { classroomId, criteriaDetails, subjectIds, assessmentIds } = req.body;

  assessmentCriteriaArraySchema.parse(criteriaDetails);
  z.string().parse(classroomId);
  stringArraySchema('Subject Id').parse(subjectIds);
  stringArraySchema('Assessment Id').parse(assessmentIds);

  await assessmentCriteriaRepository.addAssessmentCriteria(
    classroomId,
    assessmentIds,
    subjectIds,
    criteriaDetails
  );

  return res.status(200).json({
    success: true,
    message: 'Assessment Criteria details added successfully',
  });
});
const getAssessmentCriteria = asyncHandler(async (req, res) => {
  // Extract Details from the request body
  const { classroomId } = req.body;
  stringArraySchema('Classroom Id').parse(classroomId);
  return res.status(200).json({
    success: true,
  });
});
export { getAssessmentCriteria, addAssessmentCriteria };
