import { Router } from 'express';
import { createRoute, getRouteById, getRoutes } from '../Controllers/routeController.js';

const router = Router();

router.route('/').get(getRoutes).post(createRoute);
router.route('/:id').get(getRouteById);

export default router;
