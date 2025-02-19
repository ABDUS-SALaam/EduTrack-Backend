import { z } from 'zod';

export const classroomSchema = z
  .object({
    title: z
      .string({
        required_error: 'Name is required.',
      })
      .trim()
      .min(2, 'Classroom title should be at least 2 characters long.'),
    description: z
      .string()
      .trim()
      .optional()
      .refine((desc) => !desc || desc.length > 0, {
        message: 'Description cannot be only spaces.',
      }),
    academicYear: z
      .string({
        required_error: 'Academic year range is required.',
      })
      .trim()
      .regex(/^\d{4}-\d{4}$/, 'Academic year must be in the format YYYY-YYYY.'),
    startDate: z
      .string({
        required_error: 'Start date is required.',
      })
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: 'Invalid start date format. Expected a valid date string.',
      })
      .transform((dateStr) => new Date(dateStr)), // Convert string to Date
    endDate: z
      .string({
        required_error: 'End date is required.',
      })
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: 'Invalid end date format. Expected a valid date string.',
      })
      .transform((dateStr) => new Date(dateStr)),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'End date must be after start date.',
    path: ['endDate'],
  });

export type ClassroomType = z.infer<typeof classroomSchema>;
