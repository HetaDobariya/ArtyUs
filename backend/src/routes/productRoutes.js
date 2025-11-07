import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { addProduct, getAllProducts } from '../controller/productcontroller.js';

const router = express.Router();

router.post('/add-product',verifyToken,addProduct);

router.get('/getproducts', getAllProducts);

export default router;
