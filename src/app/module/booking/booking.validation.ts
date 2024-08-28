import { z } from 'zod';

export const createBookingSchema = z.object({
  startTime: z.date(),
  returnTime: z.date(),
  totalCost: z
    .number()
    .positive({ message: 'Total Cost must be positive' })
    .optional(),
  // isReturned: z.boolean().optional(),
  status: z.string(),
});
