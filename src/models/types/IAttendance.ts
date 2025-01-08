import { Document, Schema } from 'mongoose';
export interface IAttendance extends Document {
  classroomId: Schema.Types.ObjectId;
  date: Date;
  presentCount: number;
  absentCount: number;
}
