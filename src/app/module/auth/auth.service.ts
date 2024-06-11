import httpStatus from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { ModelUser } from '../user/user.model';
import { TSignupUser } from './auth.interface';
import { createToken } from './auth.utils';

const signupUser = async (payload: TSignupUser) => {
  const user = await ModelUser.doesUserExist(payload.email);
  if (!user) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User with this email already exists!',
    );
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  signupUser,
};
