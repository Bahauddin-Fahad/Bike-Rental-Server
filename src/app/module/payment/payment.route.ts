import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/advance-confirmation', PaymentControllers.confirmationController);
router.post(
  '/complete-confirmation',
  PaymentControllers.confirmationController,
);

export const PaymentRoutes = router;
