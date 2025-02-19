import { Schema, Document } from 'mongoose';

export interface IUserClassroomMapping extends Document {
  userId: Schema.Types.ObjectId;
  classroomId: Schema.Types.ObjectId;
}
