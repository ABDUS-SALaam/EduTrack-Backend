import { Schema, model } from 'mongoose';
import { IAssessment } from './types';
import { SchemaNames, ExamType } from '../constants';

const assessmentSchema = new Schema<IAssessment>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [ExamType.formative, ExamType.summative],
    },
    classroomId: { type: Schema.Types.ObjectId, required: true },
  },
  { versionKey: false }
);

const Assessment = model<IAssessment>(SchemaNames.Assessment, assessmentSchema);

export default Assessment;
