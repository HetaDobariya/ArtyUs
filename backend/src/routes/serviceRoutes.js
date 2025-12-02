import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import {
  addService,
  getMyServices,
  updateServiceById,
  deleteServiceById,
  getAllServices,
  getServiceDetails
} from '../controller/servicecontroller.js';

const router = express.Router();

// Public route
router.get('/all', getAllServices);
router.get('/details/:id', getServiceDetails);

// All routes require authentication
router.post('/add', verifyToken, addService);
router.get('/my-services', verifyToken, getMyServices);
router.put('/update/:id', verifyToken, updateServiceById);
router.delete('/delete/:id', verifyToken, deleteServiceById);

export default router;

