import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup ',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signupUser,
);

export const AuthRoutes = router;
