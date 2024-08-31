import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CouponValidation } from './coupon.validation';
import { CouponControllers } from './coupon.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(CouponValidation.createCouponSchema),
    CouponControllers.createCoupon,
  )
  .get(CouponControllers.getAllCoupons);

router.route('/:code').get(CouponControllers.getSingleCoupon);
router
  .route('/:id')
  .put(auth('admin'), CouponControllers.updateCoupon)
  .delete(auth('admin'), CouponControllers.deleteCoupon);

export const CouponRoutes = router;
