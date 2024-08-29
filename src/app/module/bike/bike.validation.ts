import { z } from 'zod';

export const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Bike Name is required'),
    image: z.string().trim().min(1, 'Image is required'),
    description: z.string().min(1, 'Description is Required'),
    pricePerHour: z
      .number()
      .positive({ message: 'Price per Hour must be positive' }),
    brand: z.string().trim().min(1, 'Bike Brand is required'),
    model: z.string().trim().min(1, 'Bike Model is required'),
    cc: z.number().min(1, 'Bike cc is required'),
    year: z.number().positive({ message: 'Year must be positive' }),
    isAvailable: z.boolean().optional(),
  }),
});
export const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Bike Name is required').optional(),
    image: z.string().trim().min(1, 'Image is required').optional(),
    description: z.string().min(1, 'Description is Required').optional(),
    pricePerHour: z
      .number()
      .positive({ message: 'Price per Hour must be positive' })
      .optional(),
    brand: z.string().trim().min(1, 'Bike Brand is required').optional(),
    model: z.string().trim().min(1, 'Bike Model is required').optional(),
    cc: z.number().min(1, 'Bike cc is required').optional(),
    year: z.number().positive({ message: 'Year must be positive' }).optional(),
    isAvailable: z.boolean().optional(),
  }),
});

export const BikeValidation = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
