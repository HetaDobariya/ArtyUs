import express from 'express'
import { getAllUsers } from "../controller/admincontroller.js";
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get("/user-details",verifyToken,getAllUsers);
// router.get("/trader-details",verifyToken,getAllTraders);

export default router;
