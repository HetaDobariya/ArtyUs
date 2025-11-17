import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { 
  addToCart, 
  getCartItems, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} from '../controller/cartcontroller.js';

const router = express.Router();

// All cart routes require authentication
router.post('/add', verifyToken, addToCart);
router.get('/my-cart', verifyToken, getCartItems);
router.put('/update/:id', verifyToken, updateCartItem);
router.delete('/remove/:id', verifyToken, removeFromCart);
router.delete('/clear', verifyToken, clearCart);

export default router;