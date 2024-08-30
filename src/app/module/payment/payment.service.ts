/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { join } from 'path';

import { readFileSync } from 'fs';
import { ModelBooking } from '../booking/booking.model';
import { verifyPayment } from '../../utils/payment';

const confirmationService = async (
  transactionId: string,
  status: string,
  paymentType: string,
) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await ModelBooking.findOneAndUpdate(
      { transactionIds: { $in: [transactionId] } },
      {
        status: paymentType === 'advance' ? 'booked' : 'paid',
      },
    );
    message = `Successfully ${paymentType === 'advance' ? 'Booked' : 'Paid'}!`;
  } else {
    message = `Could not completed ${paymentType === 'advance' ? 'Booking' : 'Payment'}!`;
  }

  const filePath = join(__dirname, '../../../../confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const PaymentServices = {
  confirmationService,
};
