import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { BikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(BikeValidation.createBikeValidationSchema),
    BikeControllers.createBike,
  )
  .get(BikeControllers.getAllBikes);

router
  .route('/:id')
  .get(BikeControllers.getSingleBike)
  .put(auth('admin'), BikeControllers.updateBike)
  .delete(auth('admin'), BikeControllers.deleteBike);

export const BikeRoutes = router;
