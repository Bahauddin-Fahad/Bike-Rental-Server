import mongoose from 'mongoose';
import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError): TErrorResponse => {
  const statusCode = 400;
  const errorMessages: TErrorMessages = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: 'Error: Invalid Id',
    errorMessages,
  };
};
export default handleCastError;
