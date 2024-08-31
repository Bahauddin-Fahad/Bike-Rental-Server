import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema(
  {
    code: { type: String, required: [true, 'Code is Required'] },
    discount: { type: Number, required: [true, 'Discount is Required'] },
  },
  { timestamps: true, versionKey: false },
);

export const ModelCoupon = model<TCoupon>('Coupon', couponSchema);
