import mongoose from 'mongoose';
import AssessmentCriteria from '../models/assessmentCriteria.model';
import {
  validateAndParseClassroomIds,
  validateAndParseAssessmentIds,
  validateAndParseSubjectIds,
} from './utils.repository';
import { AssessmentCriteriaType } from '../validations/assessmentCriteria';
import { subjectRepository } from './index';
import SAAC from '../models/SAAC.model';
import { ISAACDetails } from '../models/types/index';

const addAssessmentCriteria = async (
  classroomId: string,
  assessmentIds: string[],
  subjectIds: string[],
  criteriaDetails: AssessmentCriteriaType
): Promise<void> => {
  const parsedClassroomId = await validateAndParseClassroomIds(classroomId);

  const [parsedAssessmentIds, parsedSubjectIds, parsedAssessmentCriteriaIds] =
    await Promise.all([
      validateAndParseAssessmentIds(parsedClassroomId, assessmentIds),
      validateAndParseSubjectIds(parsedClassroomId, subjectIds),
      getAssessmentCriteriaIds(criteriaDetails),
    ]);

  // Process subjects in parallel
  await Promise.all(
    parsedSubjectIds.map(async (subjectId) => {
      const childSubjects = await subjectRepository.getChildSubjects(subjectId);
      await filterAndAddToSAAC(
        parsedAssessmentIds,
        subjectId,
        parsedAssessmentCriteriaIds,
        criteriaDetails,
        childSubjects.length > 0
          ? childSubjects.map((subject) => subject.id)
          : []
      );
    })
  );
};

const getAssessmentCriteriaIds = async (
  assessmentCriterias: AssessmentCriteriaType
): Promise<mongoose.Types.ObjectId[]> => {
  return Promise.all(
    assessmentCriterias.map(async (criteria) => {
      try {
        const existingCriteria = await AssessmentCriteria.findOne(criteria);
        if (existingCriteria) {
          return existingCriteria._id as mongoose.Types.ObjectId;
        }
        const newCriteria = await AssessmentCriteria.create(criteria);
        return newCriteria._id as mongoose.Types.ObjectId;
      } catch (error) {
        console.error('Error in getAssessmentCriteriaIds:', error);
        throw new Error('Failed to process assessment criteria.');
      }
    })
  );
};

const filterAndAddToSAAC = async (
  parsedAssessmentIds: mongoose.Types.ObjectId[],
  subjectId: mongoose.Types.ObjectId,
  parsedAssessmentCriteriaIds: mongoose.Types.ObjectId[],
  criteriaDetails: AssessmentCriteriaType,
  childSubjects: mongoose.Types.ObjectId[]
): Promise<void> => {
  const records: ISAACDetails[] = [];

  // Add records for the main subject
  parsedAssessmentIds.forEach((assessmentId) => {
    parsedAssessmentCriteriaIds.forEach((criteriaId, index) => {
      records.push({
        assessmentId,
        subjectId,
        assessmentCriteriaId: criteriaId,
        childSubjectId: null,
        unitMaxMarks: criteriaDetails[index]?.maxMarks || 0,
      } as ISAACDetails);
    });
  });

  // Add records for child subjects
  if (childSubjects.length > 0) {
    const share = 1 / childSubjects.length;
    childSubjects.forEach((childSubjectId) => {
      parsedAssessmentIds.forEach((assessmentId) => {
        parsedAssessmentCriteriaIds.forEach((criteriaId, index) => {
          records.push({
            assessmentId,
            subjectId,
            assessmentCriteriaId: criteriaId,
            childSubjectId,
            unitMaxMarks: (criteriaDetails[index]?.maxMarks || 0) * share,
          } as ISAACDetails);
        });
      });
    });
  }

  try {
    await SAAC.insertMany(records);
  } catch (error) {
    console.error('Error inserting records into SAAC:', error);
    throw new Error('Failed to insert records.');
  }
};

export { addAssessmentCriteria };
