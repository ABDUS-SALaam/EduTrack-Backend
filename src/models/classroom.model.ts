import { Schema, model } from 'mongoose';
import { IClassroom } from './types';

const classroomSchema = new Schema<IClassroom>({
  name: { type: String, required: true },
  description: { type: String },
  academicYear: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Classroom = model<IClassroom>('Classroom', classroomSchema);

export default Classroom;
