import { Router } from 'express';
import { createRoute, getRouteById, getRouteSeatMap, getRoutes, materializeExternalRoute } from '../Controllers/routeController.js';

const router = Router();

router.post('/external/sync', materializeExternalRoute);
router.route('/').get(getRoutes).post(createRoute);
router.get('/:id/seats', getRouteSeatMap);
router.route('/:id').get(getRouteById);

export default router;
