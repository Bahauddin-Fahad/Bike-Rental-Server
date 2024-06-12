import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.signupValidationSchema),
  AuthControllers.signupUser,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
