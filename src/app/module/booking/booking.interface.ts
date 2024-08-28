import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  status: string;
  transactionId: string;
  // advancePay: number;
  // isReturned: boolean;
};
