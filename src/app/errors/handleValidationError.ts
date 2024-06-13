import mongoose from 'mongoose';
import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TErrorResponse => {
  const statusCode = 400;
  const errorValues = Object.values(error?.errors);
  const errorMessages: TErrorMessages = errorValues.map(
    (errValue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: errValue.path,
        message: errValue.message,
      };
    },
  );
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages,
  };
};
export default handleValidationError;
