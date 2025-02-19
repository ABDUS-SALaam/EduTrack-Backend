import { z } from 'zod';
const assessmentCriteriaSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string.',
    required_error: 'Name is required.',
  }),
  maxMarks: z.number({
    invalid_type_error: 'Max Marks must be a number.',
    required_error: 'Max Marks is required.',
  }),
});

export const assessmentCriteriaArraySchema = z.array(assessmentCriteriaSchema, {
  invalid_type_error: 'The assessment criteria must be an array.',
});

export type AssessmentCriteriaType = z.infer<
  typeof assessmentCriteriaArraySchema
>;

// const assessmentCriteriaSchema = z.object({
//   subjectId: z.string(),
//   details: detailsArraySchema,
// });
// export const assessmentsCriteriaArraySchema = z.array(assessmentCriteriaSchema);

// export type AssessmentCriteriaType = z.infer<
//   typeof assessmentsCriteriaArraySchema
// >;
