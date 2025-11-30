import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { 
  placeOrder, 
  getUserOrders,
  getOrderById 
} from '../controller/ordercontroller.js';

const router = express.Router();

// All order routes require authentication
router.post('/place-order', verifyToken, placeOrder);
router.get('/my-orders', verifyToken, getUserOrders);
router.get('/:id', verifyToken, getOrderById);

export default router;