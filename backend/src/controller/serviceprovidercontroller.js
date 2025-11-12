import {
  findUserByEmail,
  createUser,
  createServiceProvider,
  verifyServiceProviderById,
  getUnverifiedServiceProviderList,
} from '../models/serviceprovidermodel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      contactNumber,
      shopName,
      serviceName,
      serviceAddress,
      description,
      serviceContactNumber,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !contactNumber ||
      !shopName ||
      !serviceName ||
      !serviceAddress ||
      !description ||
      !serviceContactNumber
    ) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with is_serviceprovider = 1
    const userId = await createUser({
      name,
      email,
      address,
      password: hashedPassword,
      contactNumber,
    });

    // Create service provider profile
    const serviceProviderId = await createServiceProvider({
      userId,
      serviceName,
      shopName,
      serviceAddress,
      description,
      contact: serviceContactNumber,
    });

    res.status(201).json({
      message: 'Service Provider registered successfully',
      serviceProviderId,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const verifyServiceProvider = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const result = await verifyServiceProviderById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service Provider not found or already verified' });
    }

    res.status(200).json({ message: 'Service Provider verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUnverifiedServiceProviders = async (req, res) => {
  try {
    const providers = await getUnverifiedServiceProviderList();

    if (!providers.length) {
      return res.status(404).json({ message: 'No unverified service providers found' });
    }

    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


