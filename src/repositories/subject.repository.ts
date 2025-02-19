import mongoose from 'mongoose';
import ApiError from '../utils/apiError';
import { SubjectDetailsType, SubjectArrayType } from '../validations/subject';
import { validateAndParseClassroomIds } from './utils.repository';
import Subject from '../models/subject.model';
import SubjectClassEnrollment from '../models/subjectClassEnrollment.model';

const addSubjects = async (
  requestedClassId: string,
  subjects: SubjectArrayType
) => {
  const classroomId = await validateAndParseClassroomIds(requestedClassId);

  // Recursive function to handle subjects and their children
  const processSubjects = async (
    subjects: SubjectArrayType,
    parentSubjectId?: mongoose.Types.ObjectId
  ) => {
    // Create subject documents
    const subjectDocs = subjects.map((subject: SubjectDetailsType) => ({
      name: subject.title,
      parentSubjectId,
    }));

    // Bulk insert subjects into the collection
    const insertedSubjects = await Subject.insertMany(subjectDocs);

    // Add subjects and classroom mapping
    const subjectClassEnrollmentDocs = insertedSubjects.map((subject) => {
      return {
        subjectId: subject._id,
        classroomId,
      };
    });
    if (subjectClassEnrollmentDocs.length > 0)
      await SubjectClassEnrollment.insertMany(subjectClassEnrollmentDocs);

    // Process children for each subject
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      const insertedSubject = insertedSubjects[i];

      // Add child subjects to subject collection
      if (subject.children && subject.children.length > 0) {
        await processSubjects(
          subject.children as SubjectArrayType,
          insertedSubject._id as mongoose.Types.ObjectId
        );
      }
    }
  };

  // Start processing subjects
  await processSubjects(subjects);
};

const getSubjects = async (requestedClassId: string) => {
  const classroomId = await validateAndParseClassroomIds(requestedClassId);
  const result = await SubjectClassEnrollment.aggregate([
    {
      $match: {
        classroomId,
      },
    },
    {
      $lookup: {
        from: 'subjects',
        localField: 'subjectId',
        foreignField: '_id',
        as: 'subjectDetails',
      },
    },
    {
      $unwind: '$subjectDetails',
    },
    {
      $project: {
        _id: 0,
        subjectId: '$subjectId',
        name: '$subjectDetails.name',
        parentSubjectId: '$subjectDetails.parentSubjectId',
      },
    },
    // First get all root subjects (those without parent)
    {
      $facet: {
        rootSubjects: [
          {
            $match: {
              parentSubjectId: null,
            },
          },
        ],
        childSubjects: [
          {
            $match: {
              parentSubjectId: { $ne: null },
            },
          },
        ],
      },
    },
    {
      $project: {
        subjects: {
          $map: {
            input: '$rootSubjects',
            as: 'root',
            in: {
              subjectId: '$$root.subjectId',
              name: '$$root.name',
              children: {
                $filter: {
                  input: '$childSubjects',
                  as: 'child',
                  cond: {
                    $eq: ['$$child.parentSubjectId', '$$root.subjectId'],
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $unwind: '$subjects',
    },
    {
      $replaceRoot: { newRoot: '$subjects' },
    },
    {
      $project: {
        subjectId: 1,
        name: 1,
        children: {
          $map: {
            input: '$children',
            as: 'child',
            in: {
              subjectId: '$$child.subjectId',
              name: '$$child.name',
            },
          },
        },
      },
    },
  ]);
  return result;
};

const deleteSubjects = async (classroomId: string, subjectsId: string[]) => {
  const parsedClassroomId = await validateAndParseClassroomIds(classroomId);
  if (subjectsId.length == 0) return;
  const parsedSubjectIds = subjectsId.map((subjectId) => {
    return new mongoose.Types.ObjectId(subjectId);
  });
  // Check given subjects exist or not
  const subjects = await Subject.find({
    _id: { $in: parsedSubjectIds },
  });
  if (subjects.length !== subjectsId.length) {
    throw new ApiError(400, 'One or more subjects not found.');
  }
  // Check classroom and subjectId mapping
  const classroomSubjects = await SubjectClassEnrollment.find({
    classroomId: parsedClassroomId,
    subjectId: { $in: parsedSubjectIds },
  });
  if (classroomSubjects.length !== subjectsId.length) {
    throw new ApiError(400, 'One or more subjects not found in classroom.');
  }

  // Find the id's of child subjects to be deleted
  const childSubjectsId = (
    await Subject.find({
      parentSubjectId: { $in: parsedSubjectIds },
    })
  ).map((subject) => subject._id);

  // Delete Child subjects
  await Subject.deleteMany({
    _id: { $in: childSubjectsId },
  });

  // Delete child subjects in subjectClassEnrollment
  await SubjectClassEnrollment.deleteMany({
    subjectId: { $in: childSubjectsId },
  });

  // Delete subjects and classroom mapping
  await SubjectClassEnrollment.deleteMany({
    classroomId: parsedClassroomId,
    subjectId: { $in: parsedSubjectIds },
  });
  // Delete subjects
  await Subject.deleteMany({
    _id: { $in: parsedSubjectIds },
  });

  // Todo: Delete records from score collection and from SAAC collection
};

const getChildSubjects = async (subjectId: mongoose.Types.ObjectId) => {
  const result = await Subject.aggregate([
    {
      $match: {
        parentSubjectId: subjectId,
      },
    },
    {
      $project: {
        id: '$_id',
        _id: 0,
      },
    },
  ]);
  return result;
};

export { addSubjects, getSubjects, deleteSubjects, getChildSubjects };
// Todo
