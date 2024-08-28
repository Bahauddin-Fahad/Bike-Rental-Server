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

router
  .route('/:id/return')
  .put(auth('admin'), BookingControllers.returnBikeRental);

export const BookingRoutes = router;
