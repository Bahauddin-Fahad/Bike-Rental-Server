import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { sendResponse } from '../../utils/sendResponse';

const getUserProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserServices.getProfilefromDB(user.email);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }
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
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const UserController = { getUserProfile, updateUserProfile };
