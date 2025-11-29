import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { addProduct, getAllProducts, getProductsByTraderId, updateProduct, deleteProduct, getProductsByCategory, getProduct, } from '../controller/productcontroller.js';


const router = express.Router();

router.post('/add-product',verifyToken,addProduct);

router.get('/getproducts', getAllProducts);
router.get('/my-products', verifyToken,getProductsByTraderId);

router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

router.get('/category/:category', getProductsByCategory);

router.get('/:id', getProduct);

export default router;

