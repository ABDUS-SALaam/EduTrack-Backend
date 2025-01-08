import { Schema, model } from 'mongoose';
import { IStudentClassroomMapping } from './types';

const StudentClassEnrollmentSchema = new Schema<IStudentClassroomMapping>({
  rollNumber: { type: Schema.Types.ObjectId, required: true },
  studentId: { type: Schema.Types.ObjectId, required: true },
  classroomId: { type: Schema.Types.ObjectId, required: true },
});

const StudentClassEnrollment = model<IStudentClassroomMapping>(
  'StudentClassEnrollment ',
  StudentClassEnrollmentSchema
);

export default StudentClassEnrollment;
