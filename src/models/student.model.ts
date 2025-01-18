import { Schema, model } from 'mongoose';
import { IStudent } from './types';
import { SchemaNames } from '../constants';

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
});

const Student = model<IStudent>(SchemaNames.Student, studentSchema);

export default Student;
