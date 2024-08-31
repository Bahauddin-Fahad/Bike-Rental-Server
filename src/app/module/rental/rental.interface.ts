import { Types } from 'mongoose';
import { TUser } from '../user/user.interface';
import { TBike } from '../bike/bike.interface';

export type TRental = {
  user: Types.ObjectId | TUser;
  bike: Types.ObjectId | TBike;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number | null;
  advancePaid: number;
  discount: number | null;
  costAfterDiscount: number | null;
  status: string;
  transactionIds: string[];
};
