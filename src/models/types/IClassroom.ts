import { Document } from 'mongoose';

export default interface IClassroom extends Document {
  name: string;
  description: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
}
