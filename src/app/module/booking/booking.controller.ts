import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { BookingServices } from './booking.service';

const createRental = catchAsync(async (req, res) => {
  const user = req.user;
  const bookingInfo = req.body;

  const result = await BookingServices.createRentalIntoDB(
    user?.email,
    bookingInfo,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

const returnBikeRental = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookingServices.returnBikeRentalIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});

export const BookingControllers = {
  createRental,
  returnBikeRental,
};
