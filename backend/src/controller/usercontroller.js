import { findUserByEmail, createUser } from '../models/usermodel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const { email, password, name, contact } = req.body;

    if (!email || !password || !name || !contact) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser({ email, password: hashedPassword, name, contact });

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
