import express from 'express';
import { signup, login, currentUser, updateUser,logout} from '../controller/usercontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.get('/current-user',verifyToken,currentUser);
router.put('/update',verifyToken,updateUser)
router.post('/logout', verifyToken, logout);

export default router;

