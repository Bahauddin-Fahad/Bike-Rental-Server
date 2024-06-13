/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleDuplicateError = (error: any): TErrorResponse => {
  const statusCode = 400;

  const match = error.message.match(/"([^"]*)"/);
  const extractedValue = match && match[1];
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: `${extractedValue} already exists`,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate error',
    errorMessages,
  };
};
export default handleDuplicateError;
