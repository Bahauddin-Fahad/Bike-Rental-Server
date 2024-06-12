import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRoutes } from '../module/user/user.route';
import { BikeRoutes } from '../module/bike/bike.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/bikes', route: BikeRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
