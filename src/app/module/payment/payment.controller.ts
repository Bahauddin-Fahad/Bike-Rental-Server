import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

const confirmationController = catchAsync(async (req, res) => {
  const { rentalId, transactionId, paymentType } = req.query;

  const result = await PaymentServices.confirmationService(
    rentalId as string,
    transactionId as string,
    paymentType as string,
  );
  res.send(result);
});

export const PaymentControllers = {
  confirmationController,
};
