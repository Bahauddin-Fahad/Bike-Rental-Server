import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'ModelUser',
    required: [true, 'User id is required'],
    unique: true,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: 'ModelBike',
    required: [true, 'Bike id is required'],
  },
  startTime: { type: Date, required: [true, 'Start Time is Required'] },
  returnTime: { type: Date, required: [true, 'Return Time is Required'] },
  totalCost: { type: Number, required: [true, 'Total Cost is Required'] },
  isReturned: { type: Boolean, default: false },
});

export const ModelBooking = model<TBooking>('Booking', bookingSchema);
