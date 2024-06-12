import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRoutes } from '../module/user/user.route';

const router = Router();

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/user', route: UserRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
