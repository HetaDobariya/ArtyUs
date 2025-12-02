import {
  findUserByEmail,
  createUser,
  createServiceProvider,
  verifyServiceProviderById,
  getUnverifiedServiceProviderList,
  getAllServiceProvidersFromDB,
  getServiceProviderByIdFromDB,
  getServiceProviderByUserIdFromDB,
   getServiceProviderOrdersModel,
  updateBookingStatusModel 
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


export const getAllServiceProviders = async (req, res) => {
  try {
    const providers = await getAllServiceProvidersFromDB();

    if (!providers.length) {
      return res.status(404).json({ message: 'No service providers found' });
    }

    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    console.error('Fetch all service providers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServiceProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Service Provider ID required' });
    }

    const provider = await getServiceProviderByIdFromDB(id);

    if (!provider) {
      return res.status(404).json({ error: 'Service Provider not found' });
    }

    res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (error) {
    console.error('Fetch service provider by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServiceProviderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const provider = await getServiceProviderByUserIdFromDB(userId);

    if (!provider) {
      return res.status(404).json({ error: 'Service Provider not found' });
    }

    res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (error) {
    console.error('Fetch service provider by User ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServiceProviderOrders = async (req, res) => {
  try {
    const service_provider_id = req.user?.serviceProvider?.sp_id;

    if (!service_provider_id) {
      return res.status(403).json({ 
        success: false, 
        error: 'Unauthorized: Service Provider not found or user is not a service provider' 
      });
    }

    const orders = await getServiceProviderOrdersModel(service_provider_id);

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching service provider orders:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const service_provider_id = req.user?.serviceProvider?.sp_id;

    if (!service_provider_id) {
      return res.status(403).json({ 
        success: false, 
        error: 'Unauthorized: Service Provider not found' 
      });
    }

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status is required' 
      });
    }

    const validStatuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid status. Must be one of: pending, accepted, rejected, completed, cancelled' 
      });
    }

    const updated = await updateBookingStatusModel(bookingId, service_provider_id, status);

    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        error: 'Booking not found or you are not authorized to update this booking' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: { bookingId, status }
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};