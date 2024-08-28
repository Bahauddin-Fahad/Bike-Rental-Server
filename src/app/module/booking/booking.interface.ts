import { Types } from 'mongoose';

export type TBooking = {
  user: Types.ObjectId;
  bike: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  status: string;
  transactionId: string;
  // advancePay: number;
  // isReturned: boolean;
};
