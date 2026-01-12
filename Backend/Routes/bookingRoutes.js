import { Router } from 'express';
import { createBooking, getBookingByReference } from '../Controllers/bookingController.js';

const router = Router();

router.post('/', createBooking);
router.get('/:reference', getBookingByReference);

export default router;
