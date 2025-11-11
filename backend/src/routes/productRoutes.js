import express from 'express';
// import { verifyToken } from '../middleware/verifytoken.js';
import { addProduct, getAllProducts, updateProduct, deleteProduct  } from '../controller/productcontroller.js';

const router = express.Router();

router.post('/add-product',addProduct);

router.get('/getproducts', getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);


export default router;
