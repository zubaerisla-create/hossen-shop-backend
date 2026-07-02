import { z } from 'zod';

export const signUpSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    name: z.string().min(2, 'Name must be at least 2 characters.').optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
  }),
});
