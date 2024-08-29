import { z } from 'zod';

export const createBookingSchema = z.object({
  user: z.string().min(1, 'User ID is required'),
  bike: z.string().min(1, 'Bike ID is required'),
  startTime: z.date(),
  returnTime: z.date(),
  totalCost: z.number().positive({ message: 'Total Cost must be positive' }),
  advancePaid: z
    .number()
    .positive({ message: 'Advance amount must be positive' })
    .optional(),
  status: z.string(),
  transactionIds: z
    .array(z.string())
    .nonempty('Transaction IDs array cannot be empty'),
});
