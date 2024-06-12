import express from 'express';

import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();

router
  .route('/me')
  .get(auth('user', 'admin'), UserController.getUserProfile)
  .put(
    auth('user', 'admin'),
    validateRequest(UserValidations.updateValidationSchema),
    UserController.updateUserProfile,
  );

export const UserRoutes = router;
