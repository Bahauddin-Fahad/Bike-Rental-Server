import { z } from 'zod';

const signupValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is Required')
      .max(20, "Name can't be more than 20 characters"),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(1).max(20),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required'),
    image: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is Required')
      .max(20, "Name can't be more than 20 characters")
      .optional(),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(1).max(20),
    phone: z.string().min(1, 'Phone is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    image: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is Required')
      .max(20, "Name can't be more than 20 characters")
      .optional(),
    email: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required')
      .optional(),
    phone: z.string().min(1, 'Phone is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    image: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});
export const UserValidations = {
  signupValidationSchema,
  loginValidationSchema,
  updateValidationSchema,
};
