import { Schema, Document } from 'mongoose';

export default interface ISubjectClassroomMapping extends Document {
  subjectId: Schema.Types.ObjectId;
  classroomId: Schema.Types.ObjectId;
}
