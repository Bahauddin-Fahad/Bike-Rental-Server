import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();

router
  .route('/me')
  .get(auth('user', 'admin'), UserControllers.getUserProfile)
  .put(
    auth('user', 'admin'),
    validateRequest(UserValidations.updateValidationSchema),
    UserControllers.updateUserProfile,
  );

export const UserRoutes = router;
