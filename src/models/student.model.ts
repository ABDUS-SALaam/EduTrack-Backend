import { Schema, model } from 'mongoose';
import { IStudent } from './types';

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
});

const Student = model<IStudent>('Student', studentSchema);

export default Student;
