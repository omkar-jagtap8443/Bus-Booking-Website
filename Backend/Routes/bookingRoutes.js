import { Router } from 'express';
import { createBooking, getBookingByReference, listBookings } from '../Controllers/bookingController.js';

const router = Router();

router.route('/').post(createBooking).get(listBookings);
router.get('/:reference', getBookingByReference);

export default router;
