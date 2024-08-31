import { z } from 'zod';

export const createRentalSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required'),
    bike: z.string().min(1, 'Bike ID is required'),
    startTime: z.date(),
    advancePaid: z.number().optional(),
    status: z.string().optional(),
    transactionIds: z
      .array(z.string())
      .nonempty('Transaction IDs array cannot be empty'),
  }),
});
export const updateRentalSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required').optional(),
    bike: z.string().min(1, 'Bike ID is required').optional(),
    returnTime: z.date().optional(),
    totalCost: z
      .number()
      .positive({ message: 'Total Cost must be positive' })
      .optional(),
    costAfterDiscount: z
      .number()
      .positive({ message: 'Cost after Discount must be positive' })
      .optional(),
    status: z.string().optional(),
    transactionIds: z
      .array(z.string())
      .nonempty('Transaction IDs array cannot be empty')
      .optional(),
  }),
});
