import { Schema, Document } from 'mongoose';

export default interface IUserClassroomMapping extends Document {
  userId: Schema.Types.ObjectId;
  classroomId: Schema.Types.ObjectId;
}
