import { Document, Schema } from 'mongoose';
export interface IAbsentee extends Document {
  classroomId: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  date: Date;
  reason: string | null;
}
