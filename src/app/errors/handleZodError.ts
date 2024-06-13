import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleZodError = (error: ZodError): TErrorResponse => {
  const statusCode = 400;
  const errorMessages: TErrorMessages = error?.issues?.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path.reverse()[0],
        message: issue.message,
      };
    },
  );
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorMessages,
  };
};

export default handleZodError;
