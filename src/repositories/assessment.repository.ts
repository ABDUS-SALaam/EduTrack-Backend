import Assessment from '../models/assessment.model';
import {
  validateAndParseClassroomIds,
  getMaxAssessmentCount,
} from './utils.repository';
import ApiError from '../utils/apiError';
import {
  assessmentsArraySchema,
  AssessmentType,
} from '../validations/assessment';

const addAssessment = async (
  classroomId: string,
  assessmentDetails: AssessmentType
) => {
  const parsedClassroomId = await validateAndParseClassroomIds(classroomId);
  assessmentsArraySchema.parse(assessmentDetails);

  // Get Assessments assigned to the classroom
  const classroomAssessments = await Assessment.find({
    classroomId: parsedClassroomId,
  });

  // Check the count of asssessments assigned to the classroom
  const maxCount = await getMaxAssessmentCount();
  if (classroomAssessments.length >= maxCount) {
    throw new ApiError(
      400,
      'You have reached the maximum number of assessments you can create.'
    );
  }
  // Check if any of the new assessments already exist
  const existingAssessment = assessmentDetails.some((newAssessment) =>
    classroomAssessments.some(
      (existing) =>
        existing.name === newAssessment.name.trim() &&
        existing.type === newAssessment.type
    )
  );

  if (existingAssessment) {
    throw new ApiError(
      400,
      'One or more asessment already exists for this classroom.'
    );
  }

  const assessmentsToAdd = assessmentDetails.map((assessment) => ({
    name: assessment.name.trim(),
    type: assessment.type,
    classroomId: parsedClassroomId,
  }));

  // Add the assessment to collection
  await Assessment.insertMany(assessmentsToAdd);
};

const getAssessments = async (classroomId: string) => {
  const parsedClassroomId = await validateAndParseClassroomIds(classroomId);

  return await Assessment.aggregate([
    { $match: { classroomId: parsedClassroomId } },
    { $project: { id: '$_id', name: 1, type: 1, _id: 0 } },
  ]);
};

const deleteAssessment = async (classroomId: string, assessmentId: string) => {
  const parsedClassroomId = await validateAndParseClassroomIds(classroomId);
  const parsedAssessmentId = await validateAndParseClassroomIds(assessmentId);
  // Verify assessment exists for the classroom
  const assessment = await Assessment.findOne({
    classroomId: parsedClassroomId,
    _id: parsedAssessmentId,
  });
  if (!assessment) {
    throw new ApiError(400, 'Invalid Details !!');
  }
  await Assessment.deleteOne({ _id: parsedAssessmentId });
};

export { addAssessment, getAssessments, deleteAssessment };
