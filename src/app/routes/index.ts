import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRoutes } from '../module/user/user.route';
import { BikeRoutes } from '../module/bike/bike.route';
import { RentalRoutes } from '../module/rental/rental.route';
import { PaymentRoutes } from '../module/payment/payment.route';
import { CouponRoutes } from '../module/coupon/coupon.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/bikes', route: BikeRoutes },
  { path: '/rentals', route: RentalRoutes },
  { path: '/payments', route: PaymentRoutes },
  { path: '/coupons', route: CouponRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
