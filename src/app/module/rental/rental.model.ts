import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';

const rentalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    bike: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'Bike id is required'],
    },
    startTime: { type: Date, required: [true, 'Start Time is Required'] },
    returnTime: { type: Date, default: null },
    advancePaid: { type: Number, default: null },
    totalCost: { type: Number, default: null },
    discount: { type: Number, default: null },
    costAfterDiscount: { type: Number, default: null },
    status: {
      type: String,
      enum: ['pending', 'booked', 'paid'],
      default: 'pending',
    },
    transactionIds: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ModelRental = model<TRental>('Rental', rentalSchema);
