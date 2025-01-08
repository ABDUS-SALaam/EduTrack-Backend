import { Document, Schema } from 'mongoose';

export interface IScore extends Document {
  classroomId: Schema.Types.ObjectId;
  sudentId: Schema.Types.ObjectId;
  assessmentId: Schema.Types.ObjectId;
  subjectId: Schema.Types.ObjectId;
  assessmentCriteriaId: Schema.Types.ObjectId;
  marksSecured: number;
}
