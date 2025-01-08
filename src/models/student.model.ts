import { Schema, model, Document } from 'mongoose';

interface IStudent extends Document {
  id: string;
  name: string;
}

const studentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
});

const Student = model<IStudent>('Student', studentSchema);

export default Student;
