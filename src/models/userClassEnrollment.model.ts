import { Schema, model } from 'mongoose';
import { IUserClassroomMapping } from './types';

const UserClassEnrollmentSchema = new Schema<IUserClassroomMapping>({
  userId: { type: Schema.Types.ObjectId, required: true },
  classroomId: { type: Schema.Types.ObjectId, required: true },
});

const UserClassEnrollment = model<IUserClassroomMapping>(
  'UserClassEnrollment ',
  UserClassEnrollmentSchema
);

export default UserClassEnrollment;
