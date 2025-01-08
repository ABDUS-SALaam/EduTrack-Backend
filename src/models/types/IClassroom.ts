import { Document } from 'mongoose';

export interface IClassroom extends Document {
  name: string;
  description: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
}
