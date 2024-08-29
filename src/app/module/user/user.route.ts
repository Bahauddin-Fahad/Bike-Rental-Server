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
router.patch(
  '/:id',
  validateRequest(UserValidations.updateValidationSchema),
  UserControllers.updateUserRole,
);
router.delete(
  '/:id',
  validateRequest(UserValidations.updateValidationSchema),
  UserControllers.deleteUser,
);
router.route('/').get(UserControllers.getAllUsers);
export const UserRoutes = router;
