import { Router } from 'express';
import { getSummary } from '../Controllers/metaController.js';

const router = Router();

router.get('/summary', getSummary);

export default router;
