import express from 'express';
import { signup,updateTrader} from '../controller/tradercontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/signup', signup);
router.put('/update',verifyToken,updateTrader)


export default router;