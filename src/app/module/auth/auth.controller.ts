import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

const signupUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signupUser(req.body);
  const { accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  signupUser,
};
