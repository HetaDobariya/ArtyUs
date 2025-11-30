import express from 'express';
import { 
  signup, 
  verifyServiceProvider, 
  getUnverifiedServiceProviders,
  getAllServiceProviders,
  getServiceProviderById,
  getServiceProviderByUserId,
  getServiceProviderOrders,
  updateBookingStatus
} from '../controller/serviceprovidercontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/signup', signup);
router.put("/service-details/verify/:id", verifyServiceProvider);
router.get("/service-details/unverified", getUnverifiedServiceProviders);

// New routes for fetching service provider details
router.get("/service-details/all", getAllServiceProviders);
router.get("/service-details/provider/:id", getServiceProviderById);
router.get("/service-details/user/:userId", getServiceProviderByUserId);

router.get('/my-orders', verifyToken, getServiceProviderOrders);
router.put('/update-status/:bookingId', verifyToken, updateBookingStatus);

export default router;