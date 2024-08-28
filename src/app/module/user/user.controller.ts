import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import httpStatus from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';

const getUserProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserServices.getProfilefromDB(user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUserProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const userData = req.body;

  const result = await UserServices.updateProfileInDB(user.email, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);
  if (result?.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
