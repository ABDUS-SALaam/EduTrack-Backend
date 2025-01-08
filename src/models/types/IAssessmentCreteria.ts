import { Document } from 'mongoose';
export default interface IAssessmentCreteria extends Document {
  name: string;
  maxMarks: number;
}
