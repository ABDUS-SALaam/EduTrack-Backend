import { Document } from 'mongoose';
export interface IUserClassroomMapping extends Document {
  id: number;
  userId: number;
  classroomId: number;
  createdAt: Date;
  updatedAt: Date;
}
