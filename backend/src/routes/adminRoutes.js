import express from 'express'

import { getAllUsers, getAllTraders, updateUser, deleteUser, updateTrader, deleteTrader, addSlugs } from "../controller/admincontroller.js";

// import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get("/user-details",getAllUsers);
router.put("/user-details/update/:id",updateUser);
router.delete("/user-details/delete/:id",deleteUser);

router.get("/trader-details",getAllTraders);
router.put("/trader-details/update/:id",updateTrader);
router.delete("/trader-details/delete/:id",deleteTrader);

router.post("/add-slugs",addSlugs);





export default router;
