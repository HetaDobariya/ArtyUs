import express from 'express'

import { getAllUsers, getAllTraders, updateUser, deleteUser, updateTrader, deleteTrader, addSlugs } from "../controller/admincontroller.js";

import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get("/user-details",verifyToken,getAllUsers);
router.put("/user-details/update/:id",verifyToken,updateUser);
router.delete("/user-details/delete/:id",verifyToken,deleteUser);

router.get("/trader-details",verifyToken,getAllTraders);
router.put("/trader-details/update/:id",verifyToken,updateTrader);
router.delete("/trader-details/delete/:id",verifyToken,deleteTrader);

router.post("/add-slugs", verifyToken,addSlugs);





export default router;
