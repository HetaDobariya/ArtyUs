import { findUserByEmail, createUser, createTrader, updateTraderById  } from '../models/tradermodel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const {name,email,password,address,contactNumber,shopName, shopContactNumber,shopAddress, description} = req.body;

    if (!name || !email || !address || !contactNumber || !shopName || !shopContactNumber || !shopAddress || !description) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser({ name,email,address, password: hashedPassword, contactNumber });
    const traderId = await createTrader({userId, shopName, shopContactNumber, shopAddress, description});

    res.status(201).json({ message: 'User created successfully', traderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTrader = async (req, res) => {
  try {
    const { contact, address, description } = req.body;

    if (!address || !contact || !description) {
      return res.status(400).json({ error: 'Address,contact and description are required' });
    }

    const userId = req.user.id;

    const result = await updateTraderById(userId, address, contact, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};