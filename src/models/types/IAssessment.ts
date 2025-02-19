import { Document, Schema } from 'mongoose';
import type { ExamType } from '../../constants';

export interface IAssessment extends Document {
  name: string;
  type: ExamType;
  classroomId: Schema.Types.ObjectId;
}
