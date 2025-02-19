import { Schema, model } from 'mongoose';
import { IUserClassroomMapping } from './types';
import { SchemaNames } from '../constants';

const UserClassEnrollmentSchema = new Schema<IUserClassroomMapping>({
  userId: { type: Schema.Types.ObjectId, required: true },
  classroomId: { type: Schema.Types.ObjectId, required: true },
});

const UserClassEnrollment = model<IUserClassroomMapping>(
  SchemaNames.UserClassEnrollment,
  UserClassEnrollmentSchema
);

export default UserClassEnrollment;
