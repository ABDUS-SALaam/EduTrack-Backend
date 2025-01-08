import { Schema, model, Document } from 'mongoose';

interface Iclassroom extends Document {
  id: string;
  name: string;
}

const classroomSchema = new Schema<Iclassroom>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Classroom = model<Iclassroom>('Classroom', classroomSchema);

export default Classroom;
