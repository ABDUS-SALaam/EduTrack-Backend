import { Document, Schema } from 'mongoose';

export interface IClassroom extends Document {
  title: string;
  description: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
  createdByUserId: Schema.Types.ObjectId;
}
