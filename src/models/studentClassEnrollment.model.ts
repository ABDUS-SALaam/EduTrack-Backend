import { Schema, model } from 'mongoose';
import { IStudentClassroomMapping } from './types';
import { SchemaNames } from '../constants';

const StudentClassEnrollmentSchema = new Schema<IStudentClassroomMapping>({
  rollNumber: { type: Schema.Types.ObjectId, required: true },
  studentId: { type: Schema.Types.ObjectId, required: true },
  classroomId: { type: Schema.Types.ObjectId, required: true },
});

const StudentClassEnrollment = model<IStudentClassroomMapping>(
  SchemaNames.StudentClassEnrollment,
  StudentClassEnrollmentSchema
);

export default StudentClassEnrollment;
