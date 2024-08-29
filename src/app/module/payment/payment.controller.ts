import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, status, paymentType } = req.query;

  const result = await PaymentServices.confirmationService(
    transactionId as string,
    status as string,
    paymentType as string,
  );
  res.send(result);
});

export const PaymentControllers = {
  confirmationController,
};
