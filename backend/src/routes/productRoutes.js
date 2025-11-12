import express from 'express';
import { 
  getProducts, 
  getProductsByCategory, 
  getProduct, 
  getCategories 
} from '../controller/productcontroller.js';

const router = express.Router();

// Get all categories
router.get('/categories', getCategories);

// Get all products
router.get('/', getProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get single product by ID
router.get('/:id', getProduct);

export default router;

