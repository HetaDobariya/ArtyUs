import express from 'express';
import {category, childCategory, slugs, updateSlug, deleteSlug} from '../controller/categorycontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/getCategory',verifyToken,category);
router.get('/getChildCategory',verifyToken,childCategory);

router.get('/getslugs',verifyToken,slugs);
router.put("/slug/update/:id", verifyToken, updateSlug);
router.delete("/slug/delete/:id", verifyToken, deleteSlug);

export default router;
