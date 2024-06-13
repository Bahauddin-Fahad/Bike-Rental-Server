import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ModelUser } from '../user/user.model';
import { TUser } from '../user/user.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const signupUserToRental = async (payload: TUser) => {
  const user = await ModelUser.doesUserExist(payload.email);
  if (user) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User with this email already exists!',
    );
  }
  const result = await ModelUser.create(payload);

  return result;
};

const loginUserToRental = async (payload: TUser) => {
  const user = await ModelUser.doesUserExist(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }
  const passwordmatched = await ModelUser.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!passwordmatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  // create token and sent to the  client
  const jwtPayload = {
    id: user._id,
    email: payload.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { user, accessToken };
};

export const AuthServices = {
  signupUserToRental,
  loginUserToRental,
};
