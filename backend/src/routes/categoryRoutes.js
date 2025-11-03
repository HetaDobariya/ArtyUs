import express from 'express';
import {category, childCategory} from '../controller/categorycontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/getCategory',verifyToken,category);
router.get('/getChildCategory',verifyToken,childCategory);

export default router;
