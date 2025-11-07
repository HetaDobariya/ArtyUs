import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { addProduct, getAllProducts, updateProduct, deleteProduct  } from '../controller/productcontroller.js';

const router = express.Router();

router.post('/add-product',verifyToken,addProduct);

router.get('/getproducts', getAllProducts);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);


export default router;
