import { findUserByEmail, createUser, updateUserById , findTraderByUserId , findServiceProviderByUserId } from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY=process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const { name, email,address, password, contact } = req.body;

    if (!email || !password || !address || !name || !contact) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser({ name,email,address, password: hashedPassword, contact });

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ error: "Don't have an account" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Determine user role based on all three fields
    let role = 'user';
    if (existingUser.is_trader === 1) {
      role = 'trader';
    } else if (existingUser.is_serviceprovider === 1) {
      role = 'serviceprovider';
    } else if (existingUser.is_admin === 1) {
      role = 'admin';
    }

    let userPayload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      address: existingUser.address,
      contact: existingUser.contact,
      role: role
    };

    // Add trader details if user is a trader
    if (role === 'trader') {
      const traderDetails = await findTraderByUserId(existingUser.id);
      if (traderDetails) {
        userPayload = {
          ...userPayload,
          trader: {
            trader_id: traderDetails.id,
            business_name: traderDetails.shop_name,
            shop_address: traderDetails.address,
            phone: traderDetails.contact,
            description: traderDetails.description,
          },
        };
      }
    }

    // Add service provider details if user is a service provider
    if (role === 'serviceprovider') {
      const serviceProviderDetails = await findServiceProviderByUserId(existingUser.id);
      if (serviceProviderDetails) {
        userPayload = {
          ...userPayload,
          serviceprovider: {
            serviceprovider_id: serviceProviderDetails.id,
            service_name: serviceProviderDetails.service_name,
            business_name: serviceProviderDetails.shop_name,
            service_address: serviceProviderDetails.service_address,
            phone: serviceProviderDetails.contact,
            description: serviceProviderDetails.description,
          },
        };
      }
    }

    const token = jwt.sign(userPayload, SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        role: role,
        name: existingUser.name,
        email: existingUser.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const currentUser = async (req, res) => {
  try {
    // If user is not authenticated, return null with a message
    if (!req.user) {
      return res.json({ 
        user: null,
        message: 'Please login to access this feature'
      });
    }
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { address, contact } = req.body;

    if (!address || !contact) {
      return res.status(400).json({ error: 'Address and contact are required' });
    }

    const userId = req.user.id;

    const result = await updateUserById(userId, address, contact);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: false, // match with how you set it
      secure: false,   // true in production (HTTPS)
      sameSite: 'Lax',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
