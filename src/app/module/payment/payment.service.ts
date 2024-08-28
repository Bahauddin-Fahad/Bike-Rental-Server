/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { join } from 'path';

import { readFileSync } from 'fs';
import { ModelBooking } from '../booking/booking.model';
import { verifyPayment } from '../../utils/payment';

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await ModelBooking.findOneAndUpdate(
      { transactionId },
      {
        status: 'booked',
      },
    );
    message = 'Successfully Booked!';
  } else {
    message = 'Booking Failed!';
  }

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const PaymentServices = {
  confirmationService,
};
