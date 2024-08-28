import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../module/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { ModelUser } from '../module/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You are not authorized',
      });
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;
    if (requiredRoles && !requiredRoles.includes(role)) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    // checking if the user is exist
    const user = await ModelUser.doesUserExist(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
