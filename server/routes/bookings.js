import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import {
  getAllBookings,
  getUserBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  addBookingReview
} from '../controllers/bookingController.js';

const router = express.Router();

// Admin routes
router.get('/all', auth, checkRole(['admin']), getAllBookings);

// Protected routes
router.get('/', auth, getUserBookings);
router.get('/:id', auth, getBookingById);
router.post('/', auth, createBooking);
router.patch('/:id/status', auth, updateBookingStatus);
router.post('/:id/review', auth, addBookingReview);

export default router;