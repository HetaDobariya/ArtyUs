import express from 'express';
import {category, childCategory, slugs} from '../controller/categorycontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/getCategory',verifyToken,category);
router.get('/getChildCategory',verifyToken,childCategory);
router.get('/getslugs',slugs);

export default router;
