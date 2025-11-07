import express from 'express';
import { signup,updateTrader, verifyTrader,getUnverifiedTraders} from '../controller/tradercontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/signup', signup);
router.put('/update',verifyToken,updateTrader)

router.put("/trader-details/verify/:id", verifyToken, verifyTrader);
router.get("/trader-details/unverified", verifyToken, getUnverifiedTraders);


export default router;