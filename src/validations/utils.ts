import { z } from 'zod';

export const stringArraySchema = (idType: string) => {
  return z
    .array(z.string(), {
      invalid_type_error: `The ${idType} should be an array of strings.`,
    })
    .nonempty(`${idType} cannot be empty. Please provide at least one value.`);
};
