// Define the validation schema
import { z } from 'zod';
export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email('Invalid email format.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(6, 'Password must be at least 6 characters long.'),
});
export const SignUpSchema = z.object({
  firstName: z
    .string({
      required_error: 'Name is required.',
    })
    .trim()
    .min(2, 'FirstName must be at least 2 characters long.'),
  lastName: z
    .string({
      required_error: 'Name is required.',
    })
    .trim()
    .min(2, 'LastName must be at least 2 characters long.'),
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email('Invalid email format.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .trim()
    .min(6, 'Password must be at least 6 characters long.'),
  phoneNumber: z
    .string({
      required_error: 'Phone number is required.',
    })
    .length(10, 'Phone number must be 10 characters long.'),
});
