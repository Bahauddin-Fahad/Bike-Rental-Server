import { z } from 'zod';

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(1, 'Code is required'),
    discount: z.number().positive({ message: 'Discount must be positive' }),
  }),
});

export const CouponValidation = {
  createCouponSchema,
};
