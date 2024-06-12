import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    status: data?.statusCode,
    success: data?.success,
    message: data?.message,
    token: data?.token,
    data: data?.data,
  });
};
