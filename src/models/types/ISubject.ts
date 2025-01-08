import { Document, Schema } from 'mongoose';
export default interface ISubject extends Document {
  subjectId: Schema.Types.ObjectId;
  parentSubjectId: Schema.Types.ObjectId;
}
