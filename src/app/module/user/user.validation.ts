import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is Required')
      .max(20, "Name can't be more than 20 characters"),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(1).max(20),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required'),
    role: z.enum(['user', 'admin']),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
