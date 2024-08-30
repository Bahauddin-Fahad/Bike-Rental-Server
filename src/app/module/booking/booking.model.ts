import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema(
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
    returnTime: { type: Date },
    totalCost: { type: Number, required: [true, 'Total Cost is Required'] },
    advancePaid: { type: Number },
    discount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'booked', 'paid'],
      default: 'pending',
    },
    // transactionId: {
    //   type: String,
    //   default: '',
    // },
    transactionIds: {
      type: [String], // Array of strings for transaction IDs
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ModelBooking = model<TBooking>('Booking', bookingSchema);
