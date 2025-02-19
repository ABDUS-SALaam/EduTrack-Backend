import mongoose, { Document } from 'mongoose';

//Subject_Assessment_AssessmentCriteria_Details (ISAACDetails)
export interface ISAACDetails extends Document {
  assessmentId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  assessmentCriteriaId: mongoose.Types.ObjectId;
  unitMaxMarks: number;
  childSubjectId: mongoose.Types.ObjectId | null;
}
