import express from 'express';
import {category, childCategory, slugs, updateSlug, deleteSlug} from '../controller/categorycontroller.js';
// import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/getCategory',category);
router.get('/getChildCategory',childCategory);

router.get('/getslugs',slugs);
router.put("/slug/update/:id", updateSlug);
router.delete("/slug/delete/:id", deleteSlug);

export default router;
