import { Schema, model } from 'mongoose';
import { IAssessmentCriteria } from './types';
import { SchemaNames } from '../constants';

const assessmentSchema = new Schema<IAssessmentCriteria>(
  {
    name: { type: String, required: true },
    maxMarks: { type: Number, required: true },
  },
  { versionKey: false }
);

const AssessmentCriteria = model<IAssessmentCriteria>(
  SchemaNames.AssessmentCriteria,
  assessmentSchema
);

export default AssessmentCriteria;
