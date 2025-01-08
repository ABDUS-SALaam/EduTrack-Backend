import { Schema, Document } from 'mongoose';

export default interface IStudentClassroomMapping extends Document {
  rollNumber: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  classroomId: Schema.Types.ObjectId;
}
