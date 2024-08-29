import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);

  if (result?.result?.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});
const getSingleBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BikeServices.getSingleBikeFromDB(id);
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'No Bike Found',
      data: null,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike retrieved successfully',
    data: result,
  });
});
const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bikeData = req.body;
  const result = await BikeServices.updateBikeIntoDB(id, bikeData);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Bike Not Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});
const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BikeServices.deleteBikefromDB(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Bike Not Found',
      data: result,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
