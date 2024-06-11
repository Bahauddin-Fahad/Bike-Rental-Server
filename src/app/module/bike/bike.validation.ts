import { z } from 'zod';

export const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Bike Name is required'),
    description: z.string().min(1, 'Description is Required'),
    pricePerHour: z
      .number()
      .positive({ message: 'Price per Hour must be positive' }),
    isAvailable: z.boolean().optional(),
    cc: z.string().min(1, 'Bike cc is required'),
    year: z.number().positive({ message: 'Year must be positive' }),
    model: z.string().trim().min(1, 'Bike Model is required'),
    brand: z.string().trim().min(1, 'Bike Brand is required'),
  }),
});

export const BikeValidation = {
  createBikeValidationSchema,
};
