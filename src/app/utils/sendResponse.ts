import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    status: data?.statusCode,
    message: data?.message,
    token: data?.token,
    data: data?.data,
  });
};
