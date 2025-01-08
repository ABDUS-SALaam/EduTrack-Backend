import { Schema, model } from 'mongoose';
import { ISubject } from './types';

const subjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
  parentSubjectId: { type: Schema.Types.ObjectId, optional: true },
});

const Subject = model<ISubject>('Subject', subjectSchema);

export default Subject;
