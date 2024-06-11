import { z } from 'zod';

const signupValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').trim(),
    password: z.string().min(1).max(20),
  }),
});

export const AuthValidation = {
  signupValidationSchema,
};
