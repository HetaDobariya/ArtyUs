import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { 
  addProduct, 
  getAllProducts, 
  getProductsByTraderId, 
  updateProduct, 
  deleteProduct,
  getProducts, 
  getProductsByCategory, 
  getProduct, 
  getCategories 
} from '../controller/productcontroller.js';

const router = express.Router();

router.post('/add-product',verifyToken,addProduct);

router.get('/getproducts', getAllProducts);
router.get('/my-products', verifyToken,getProductsByTraderId);

router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);



// Get all categories
router.get('/categories', getCategories);

// Get all products
router.get('/', getProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get single product by ID
router.get('/:id', getProduct);

export default router;

