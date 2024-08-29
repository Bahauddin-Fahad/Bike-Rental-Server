import { Types } from 'mongoose';
import { TUser } from '../user/user.interface';
import { TBike } from '../bike/bike.interface';

export type TBooking = {
  user: Types.ObjectId | TUser;
  bike: Types.ObjectId | TBike;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  advancePaid: number;
  status: string;
  transactionIds: string[];
  // transactionId: string;
};
