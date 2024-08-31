/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCoupon } from './coupon.interface';
import { ModelCoupon } from './coupon.model';
import { couponSearchableFields } from './coupon.constant';

const createCouponIntoDB = async (payload: Partial<TCoupon>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await ModelCoupon.create(payload);
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllCouponsFromDB = async (query: Record<string, unknown>) => {
  const couponQuery = new QueryBuilder(ModelCoupon.find(), query)
    .search(couponSearchableFields)
    .filter()
    .sort()
    .paginate()
    .filterFields();

  const meta = await couponQuery.countTotal();
  const result = await couponQuery.modelQuery;

  return { meta, result };
};
const getSingleCouponFromDB = async (code: string) => {
  return await ModelCoupon.findOne({ code });
};
const updateCouponIntoDB = async (id: string, payload: Partial<TCoupon>) => {
  const result = await ModelCoupon.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteCouponfromDB = async (id: string) => {
  const result = await ModelCoupon.findByIdAndDelete(id);
  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  getSingleCouponFromDB,
  updateCouponIntoDB,
  deleteCouponfromDB,
};
