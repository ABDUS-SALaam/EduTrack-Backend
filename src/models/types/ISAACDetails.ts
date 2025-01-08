import { Document, Schema } from 'mongoose';
//Subject_Assessment_AssessmentCriteria_Details (ISAACDetails)
export interface ISAACDetails extends Document {
  assessmentId: Schema.Types.ObjectId;
  subjectId: Schema.Types.ObjectId;
  assessmentCriteriaId: Schema.Types.ObjectId;
  unitMaxMarks: number;
  childSubjectId: Schema.Types.ObjectId | null;
}
