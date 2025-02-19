import { Document } from 'mongoose';
export interface IAssessmentCriteria extends Document {
  name: string;
  maxMarks: number;
}
