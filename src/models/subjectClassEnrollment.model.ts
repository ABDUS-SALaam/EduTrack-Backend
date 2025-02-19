import { Schema, model } from 'mongoose';
import { ISubjectClassroomMapping } from './types';
import { SchemaNames } from '../constants';

const subjectClassEnrollmentSchema = new Schema<ISubjectClassroomMapping>({
  classroomId: { type: Schema.Types.ObjectId, required: true },
  subjectId: { type: Schema.Types.ObjectId, required: true },
});

const SubjectClassEnrollment = model<ISubjectClassroomMapping>(
  SchemaNames.SubjectClassEnrollment,
  subjectClassEnrollmentSchema
);

export default SubjectClassEnrollment;
