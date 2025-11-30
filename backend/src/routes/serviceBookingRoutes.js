import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { 
  bookService, 
  getUserBookings, 
  getProviderBookings 
} from '../controller/servicebookingcontroller.js';

const router = express.Router();

// All routes require authentication
router.post('/book', verifyToken, bookService);
router.get('/my-bookings', verifyToken, getUserBookings);
router.get('/provider/:service_provider_id', verifyToken, getProviderBookings);

export default router;

