/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ModelUser } from '../user/user.model';
import { TBooking } from './booking.interface';
import { ModelBooking } from './booking.model';
import { ModelBike } from '../bike/bike.model';
import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';

const createRentalIntoDB = async (
  email: string,
  payload: Partial<TBooking>,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //checking if start time exists in the body
    if (payload.startTime) {
      const startTime = new Date(payload.startTime).getTime();
      const currentTime = new Date().getTime();

      //checking if the start time is greater than the current time
      if (startTime > currentTime) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Start time can't be greater than Current time",
        );
      }
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You must provide a start time',
      );
    }

    const bikeDetails = await ModelBike.findById(payload.bikeId);

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
    const user = await ModelUser.findOne({ email });
    const bookingData = {
      userId: user?._id,
      bikeId: payload.bikeId,
      startTime: payload.startTime,
      returnTime: null,
      totalCost: 0,
      isReturned: false,
    };

    const bookedDetails = await ModelBooking.create(bookingData);
    if (!bookedDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create the rental');
    }

    //updating the isAvailable value to false
    const updatedBikeDetails = await ModelBike.findByIdAndUpdate(
      payload.bikeId,
      { isAvailable: false },
      { new: true },
    );
    if (!updatedBikeDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create the rental');
    }

    await session.commitTransaction();
    await session.endSession();

    return bookedDetails;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const returnBikeRentalIntoDB = async (rentalId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //getting rental data
    const rentalInfo = await ModelBooking.findById(rentalId);

    if (!rentalInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No Rental Data found with this ID',
      );
    }
    if (rentalInfo.isReturned) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'The Bike is already returned from this rent',
      );
    }

    //checking if the bike is available for rental and updating the availability
    const bikeDetails = await ModelBike.findByIdAndUpdate(
      rentalInfo.bikeId,
      { isAvailable: true },
      { new: true },
    );
    if (!bikeDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, 'The Bike is not found');
    }

    //calculating the rental cost
    const bikeRentalPrice = bikeDetails.pricePerHour;
    const bookingStartTime = rentalInfo.startTime.getTime();
    const bookingReturnTime = new Date().getTime();
    const totalHour = (bookingReturnTime - bookingStartTime) / (1000 * 3600);
    const totalRentalCost = (bikeRentalPrice * totalHour).toFixed(0);

    //updating the rental info
    const updatedRentalInfo = await ModelBooking.findByIdAndUpdate(
      rentalId,
      {
        returnTime: bookingReturnTime,
        totalCost: totalRentalCost,
        isReturned: true,
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
const getMyRentalsFromDB = async (userId: string) => {
  const rentalData = await ModelBooking.find({ userId });
  return rentalData;
};

export const BookingServices = {
  createRentalIntoDB,
  returnBikeRentalIntoDB,
  getMyRentalsFromDB,
};
