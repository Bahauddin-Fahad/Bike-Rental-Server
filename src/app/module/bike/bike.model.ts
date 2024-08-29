import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Bike Name is Required'],
    },
    image: {
      type: String,
      required: [true, 'Image is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description is Required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per Hour is Required'],
    },
    brand: {
      type: String,
      required: [true, 'Bike Brand is Required'],
    },
    model: {
      type: String,
      required: [true, 'Bike Model is Required'],
    },
    cc: {
      type: Number,
      required: [true, 'cc is Required'],
    },
    year: {
      type: Number,
      required: [true, 'Bike Year is Required'],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ModelBike = model<TBike>('Bike', bikeSchema);
