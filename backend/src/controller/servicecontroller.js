import {
  getServiceProviderIdByUserId,
  createService,
  getServicesByServiceProviderId,
  getServiceById,
  updateService,
  deleteService,
  getAllServices as getAllServicesModel,
  getServiceDetailsById
} from '../models/servicemodel.js';

// Add a new service
export const addService = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    // Get service provider ID for this user
    const service_provider_id = await getServiceProviderIdByUserId(user_id);

    if (!service_provider_id) {
      return res.status(404).json({
        error: 'Service provider profile not found. Please complete your service provider registration.'
      });
    }

    const { name, description, price, image_url } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        error: 'Service name and description are required'
      });
    }

    const serviceId = await createService({
      service_provider_id,
      name,
      description,
      price: price ? parseFloat(price) : null,
      image_url: image_url || null
    });

    res.status(201).json({
      success: true,
      message: 'Service added successfully',
      service_id: serviceId
    });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get all services for the logged-in service provider
export const getMyServices = async (req, res) => {
  try {
    const user_id = req.user?.id;
    console.log('getMyServices: user_id', user_id);

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    // Get service provider ID for this user
    const service_provider_id = await getServiceProviderIdByUserId(user_id);
    console.log('getMyServices: service_provider_id', service_provider_id);

    if (!service_provider_id) {
      return res.status(200).json({ services: [] });
    }

    const services = await getServicesByServiceProviderId(service_provider_id);
    console.log('getMyServices: found services', services.length);

    res.status(200).json({
      success: true,
      services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Update a service
export const updateServiceById = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    // Get service provider ID for this user
    const service_provider_id = await getServiceProviderIdByUserId(user_id);

    if (!service_provider_id) {
      return res.status(404).json({
        error: 'Service provider profile not found'
      });
    }

    // Verify the service belongs to this service provider
    const service = await getServiceById(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (service.service_provider_id !== service_provider_id) {
      return res.status(403).json({ error: 'You do not have permission to update this service' });
    }

    const { name, description, price, image_url } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        error: 'Service name and description are required'
      });
    }

    const updated = await updateService(id, {
      name,
      description,
      price: price ? parseFloat(price) : null,
      image_url: image_url || null
    });

    if (updated) {
      res.status(200).json({
        success: true,
        message: 'Service updated successfully'
      });
    } else {
      res.status(500).json({ success: false, error: 'Failed to update service' });
    }
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Delete a service
export const deleteServiceById = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    // Get service provider ID for this user
    const service_provider_id = await getServiceProviderIdByUserId(user_id);

    if (!service_provider_id) {
      return res.status(404).json({
        error: 'Service provider profile not found'
      });
    }

    // Verify the service belongs to this service provider
    const service = await getServiceById(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (service.service_provider_id !== service_provider_id) {
      return res.status(403).json({ error: 'You do not have permission to delete this service' });
    }

    const deleted = await deleteService(id);

    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Service deleted successfully'
      });
    } else {
      res.status(500).json({ success: false, error: 'Failed to delete service' });
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get all services (public)
export const getAllServices = async (req, res) => {
  try {
    const services = await getAllServicesModel();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Error fetching all services:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get service details by ID (public)
export const getServiceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await getServiceDetailsById(id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
