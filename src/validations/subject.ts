import { z } from 'zod';

// Define the schema for SubjectDetails with explicit type annotation
const subjectDetailsSchema: z.ZodType<{
  title: string;
  children?: Array<{
    title: string;
    children?: unknown[]; // Recursive children
  }>;
}> = z.object({
  title: z.string().min(1, 'Title is required'),
  children: z.array(z.lazy(() => subjectDetailsSchema)).optional(),
});

// Define the schema for an array of subjects
export const subjectsArraySchema = z.array(subjectDetailsSchema);

// Infer the type from the schema
export type SubjectArrayType = z.infer<typeof subjectsArraySchema>;
export type SubjectDetailsType = z.infer<typeof subjectDetailsSchema>;
