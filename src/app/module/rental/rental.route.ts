import express from 'express';

import { RentalControllers } from './rental.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router
  .route('/')
  .post(auth('user', 'admin'), RentalControllers.createRental)
  .get(auth('admin'), RentalControllers.getAllRentals);

router
  .route('/my-rentals')
  .get(auth('user', 'admin'), RentalControllers.getMyRentals);

router
  .route('/:id/calculate')
  .put(auth('admin'), RentalControllers.calculateTotalCost);
router
  .route('/:id/pay')
  .put(auth('user', 'admin'), RentalControllers.payTotalCost);

export const RentalRoutes = router;
