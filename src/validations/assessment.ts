import { z } from 'zod';
import { ExamType } from '../constants';
const assessmentSchema = z.object({
  type: z.enum([ExamType.formative, ExamType.summative]),
  name: z.string(),
});
export const assessmentsArraySchema = z.array(assessmentSchema);

export type AssessmentType = z.infer<typeof assessmentsArraySchema>;
