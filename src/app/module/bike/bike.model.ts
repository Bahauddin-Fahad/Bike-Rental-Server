import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Bike Name is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description is Required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per Hour is Required'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: String,
      required: [true, 'cc is Required'],
    },
    year: {
      type: Number,
      required: [true, 'Bike Year is Required'],
    },
    model: {
      type: String,
      required: [true, 'Bike Model is Required'],
    },
    brand: {
      type: String,
      required: [true, 'Bike Brand is Required'],
    },
  },
  { timestamps: true },
);

export const ModelBike = model<TBike>('Bike', bikeSchema);
