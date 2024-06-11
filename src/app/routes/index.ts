import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';

const router = Router();

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const moduleRoutes = [
  // { path: '/user', route: UserR },
  { path: '/auth', route: AuthRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
