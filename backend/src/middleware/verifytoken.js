// middleware/verifytoken.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next(); // continue to next route
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
