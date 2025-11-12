import express from 'express';
import { signup, verifyServiceProvider, getUnverifiedServiceProviders } from '../controller/serviceprovidercontroller.js';
// import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/signup', signup);
router.put("/service-details/verify/:id", verifyServiceProvider);
router.get("/service-details/unverified", getUnverifiedServiceProviders);

export default router;
