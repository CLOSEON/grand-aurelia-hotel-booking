import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingByRef,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/bookingController';

const router = Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.get('/ref/:ref', getBookingByRef);
router.patch('/:id/cancel', cancelBooking);
router.patch('/:id/status', updateBookingStatus);

export default router;

