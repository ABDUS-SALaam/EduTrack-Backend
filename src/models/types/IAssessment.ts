import { Document, Schema } from 'mongoose';
export default interface IAssessment extends Document {
  name: string;
  type: 'formative' | 'summative';
  classroomId: Schema.Types.ObjectId;
}
