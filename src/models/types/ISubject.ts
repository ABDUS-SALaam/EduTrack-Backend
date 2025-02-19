import { Document, Schema } from 'mongoose';
export interface ISubject extends Document {
  name: string;
  parentSubjectId: Schema.Types.ObjectId;
}
