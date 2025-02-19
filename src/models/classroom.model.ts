import { Schema, model } from 'mongoose';
import { IClassroom } from './types';
import { SchemaNames } from '../constants';

const classroomSchema = new Schema<IClassroom>({
  title: { type: String, required: true },
  description: { type: String },
  academicYear: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Classroom = model<IClassroom>(SchemaNames.Classroom, classroomSchema);

export default Classroom;
