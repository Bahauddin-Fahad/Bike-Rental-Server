import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { RentalServices } from './rental.service';

const createRental = catchAsync(async (req, res) => {
  const user = req.user;
  const rentalInfo = req.body;

  const result = await RentalServices.createRentalIntoDB(user, rentalInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

const calculateTotalCost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RentalServices.calculateTotalCostIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cost Calculated successfully',
    data: result,
  });
});
const payTotalCost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RentalServices.payTotalCostIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cost Paid Successfully',
    data: result,
  });
});

const getMyRentals = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await RentalServices.getMyRentalsFromDB(user?._id, req.query);

  if (result?.result?.length <= 0) {
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});
const getAllRentals = catchAsync(async (req, res) => {
  const result = await RentalServices.getALLRentalsFromDB(req.query);

  if (result.result?.length <= 0) {
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const RentalControllers = {
  createRental,
  calculateTotalCost,
  payTotalCost,
  getMyRentals,
  getAllRentals,
};
