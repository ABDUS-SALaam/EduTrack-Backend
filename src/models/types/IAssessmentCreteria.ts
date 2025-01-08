import { Document } from 'mongoose';
export interface IAssessmentCreteria extends Document {
  name: string;
  maxMarks: number;
}
