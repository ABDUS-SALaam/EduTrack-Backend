import { Schema, model } from 'mongoose';
import { ISAACDetails } from './types';
import { SchemaNames } from '../constants';

const SAACSchema = new Schema<ISAACDetails>({
  assessmentId: { type: Schema.Types.ObjectId, required: true },
  subjectId: { type: Schema.Types.ObjectId, required: true },
  childSubjectId: { type: Schema.Types.ObjectId || null },
  assessmentCriteriaId: { type: Schema.Types.ObjectId, required: true },
  unitMaxMarks: { type: Number, required: true },
});

const SAAC = model<ISAACDetails>(SchemaNames.SAAC, SAACSchema);

export default SAAC;
