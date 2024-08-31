/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ModelUser } from '../user/user.model';
import { TRental } from './rental.interface';
import { ModelRental } from './rental.model';
import { ModelBike } from '../bike/bike.model';
import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';

import QueryBuilder from '../../builder/QueryBuilder';
import { TUser } from '../user/user.interface';
import { initiatePayment } from '../payment/payment.utils';

const createRentalIntoDB = async (
  requestedUser: JwtPayload,
  payload: Partial<TRental>,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //checking if start time exists in the body
    if (payload.startTime) {
      const startTime = new Date(payload.startTime).getTime();
      const currentTime = new Date().getTime();

      //checking if the start time is greater than the current time
      if (startTime < currentTime) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Start time can't be smaller than Current time",
        );
      }
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You must provide a start time',
      );
    }

    const bikeDetails = await ModelBike.findById(payload.bike);

    //checking if the bike exists
    if (!bikeDetails) {
      throw new AppError(httpStatus.NOT_FOUND, 'The Bike is not found');
    }

    //checking if the bike is available for rental
    if (!bikeDetails?.isAvailable) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'The Bike is not available for rent',
      );
    }

    //creating the rental
    const user = await ModelUser.findOne({ email: requestedUser.email });
    const transactionId = `TXN-${Date.now()}`;

    const rentalData = {
      user: user?._id,
      bike: payload.bike,
      startTime: payload.startTime,
    };

    const rentalDetails = await ModelRental.create(rentalData);
    if (!rentalDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create the rental');
    }

    const paymentData = {
      transactionId,
      amount: 100,
      rentalId: rentalDetails?._id,
      paymentType: 'advance',
      customerName: user!.name,
      customerEmail: user!.email,
      customerPhone: user!.phone,
      customerAddress: user!.address,
    };

    const paymentSession = await initiatePayment(paymentData);

    //updating the isAvailable value to false
    const updatedBikeDetails = await ModelBike.findByIdAndUpdate(
      payload.bike,
      { isAvailable: false },
      { new: true },
    );
    if (!updatedBikeDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Bike Not Found');
    }
    await session.commitTransaction();
    await session.endSession();

    return paymentSession;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const calculateTotalCostIntoDB = async (
  id: string,
  payload: Partial<TRental>,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //getting rental data
    const rentalInfo = await ModelRental.findById(id);

    if (!rentalInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No Rental Data found with this ID',
      );
    }
    const rentalStartTime = rentalInfo?.startTime.getTime();
    const rentalReturnTime = new Date(payload?.returnTime as Date).getTime();

    if (rentalStartTime) {
      //checking if the start time is greater than the current time
      if (rentalStartTime > rentalReturnTime) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Start time can't be larger than Return time",
        );
      }
    }

    // checking if the bike is available and updating the availability
    const bikeDetails = await ModelBike.findByIdAndUpdate(
      rentalInfo.bike,
      { isAvailable: true },
      { new: true },
    );
    if (!bikeDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, 'The Bike is not found');
    }

    // calculating the rental cost
    const bikeRentalPrice = bikeDetails.pricePerHour;
    const totalHour = (rentalReturnTime - rentalStartTime) / (1000 * 3600);
    const totalRentalCost = Math.round(bikeRentalPrice * totalHour);

    // updating the rental info
    const updatedRentalInfo = await ModelRental.findByIdAndUpdate(
      id,
      {
        returnTime: rentalReturnTime,
        totalCost: totalRentalCost,
      },
      { new: true },
    );

    await session.commitTransaction();
    await session.endSession();

    return updatedRentalInfo;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const payTotalCostIntoDB = async (
  rentalId: string,
  payload: Partial<TRental>,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //getting rental data
    const rentalInfo = await ModelRental.findById(rentalId).populate('user');

    if (!rentalInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No Rental Data found with this ID',
      );
    }

    const userDetails = rentalInfo.user as TUser;
    const transactionId = `TXN-${Date.now()}`;
    const totalCost = rentalInfo?.totalCost as number;
    const finalCost = await calculateCost(totalCost, payload.discount!);

    // updating the rental info
    const updatedRentalInfo = await ModelRental.findByIdAndUpdate(
      rentalId,
      {
        discount: payload.discount,
        costAfterDiscount: finalCost,
      },
      { new: true },
    );
    if (!updatedRentalInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Pay');
    }

    const paymentData = {
      transactionId,
      amount: finalCost - 100,
      rentalId: updatedRentalInfo?._id,
      paymentType: 'complete',
      customerName: userDetails!.name,
      customerEmail: userDetails!.email,
      customerPhone: userDetails!.phone,
      customerAddress: userDetails!.address,
    };
    const paymentSession = await initiatePayment(paymentData);
    await session.commitTransaction();
    await session.endSession();

    return paymentSession;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMyRentalsFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const rentalQuery = new QueryBuilder(
    ModelRental.find({
      user: userId,
    })
      .populate(
        'user',
        '-password -createdAt -updatedAt -address -phone -image -__v',
      )
      .populate('bike', ''),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const meta = await rentalQuery.countTotal();
  const result = await rentalQuery.modelQuery;

  return { meta, result };
};
const getALLRentalsFromDB = async (query: Record<string, unknown>) => {
  const rentalQuery = new QueryBuilder(
    ModelRental.find()
      .populate(
        'user',
        '-password -createdAt -updatedAt -address -phone -image -__v',
      )
      .populate('bike', ''),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const meta = await rentalQuery.countTotal();
  const result = await rentalQuery.modelQuery;

  return { meta, result };
};

const calculateCost = (originalCost: number, discountPercent: number) => {
  if (discountPercent > 0) {
    const discountAmount = (originalCost * discountPercent) / 100;
    const finalPrice = originalCost - discountAmount;

    return Math.round(finalPrice);
  }
  return originalCost;
};

export const RentalServices = {
  createRentalIntoDB,
  calculateTotalCostIntoDB,
  payTotalCostIntoDB,
  getMyRentalsFromDB,
  getALLRentalsFromDB,
};
