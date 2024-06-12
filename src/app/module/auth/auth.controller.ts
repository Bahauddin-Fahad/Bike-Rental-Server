import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

const signupUser = catchAsync(async (req, res) => {
  const { result } = await AuthServices.signupUserToRental(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const { user, accessToken } = await AuthServices.loginUserToRental(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  signupUser,
  loginUser,
};
