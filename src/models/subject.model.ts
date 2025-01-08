import { Schema, model, Document } from 'mongoose';

interface Isubject extends Document {
  name: string;
}

const subjectSchema = new Schema<Isubject>({
  name: { type: String, required: true },
});

const Subject = model<Isubject>('Classroom', subjectSchema);

export default Subject;
