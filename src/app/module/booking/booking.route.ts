import express from 'express';

import { BookingControllers } from './booking.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router
  .route('/')
  .post(auth('user', 'admin'), BookingControllers.createRental)
  .get(auth('admin'), BookingControllers.getAllRentals);

router
  .route('/my-rentals')
  .get(auth('user', 'admin'), BookingControllers.getMyRentals);

// router
//   .route('/:id/return')
//   .put(auth('user', 'admin'), BookingControllers.returnBikeRental);
router
  .route('/:id/calculate')
  .put(auth('admin'), BookingControllers.calculateTotalCost);
router
  .route('/:id/pay')
  .put(auth('user', 'admin'), BookingControllers.payTotalCost);

export const BookingRoutes = router;
