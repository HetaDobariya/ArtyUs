import express from 'express'
import { 
  getAllUsers, 
  getAllTraders, 
  updateUser, 
  deleteUser, 
  updateTrader, 
  deleteTrader, 
  addSlugs, 
  updateServiceProvider,
  getAllServiceProvider,
  deleteServiceProvider
} from "../controller/admincontroller.js";

const router = express.Router();

// User routes
router.get("/user-details", getAllUsers);
router.put("/user-details/update/:id", updateUser);
router.delete("/user-details/delete/:id", deleteUser);

// Trader routes
router.get("/trader-details", getAllTraders);
router.put("/trader-details/update/:id", updateTrader);
router.delete("/trader-details/delete/:id", deleteTrader);

// Service Provider routes
router.get("/serviceprovider-details", getAllServiceProvider);
router.put("/serviceprovider-details/update/:id", updateServiceProvider);
router.delete("/serviceprovider-details/delete/:id", deleteServiceProvider);

router.post("/add-slugs", addSlugs);

export default router;