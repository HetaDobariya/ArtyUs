import { createServiceBooking, getUserServiceBookings, getServiceProviderBookings } from '../models/servicebookingmodel.js';

export const bookService = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { 
      service_provider_id, 
      request_title, 
      request_details, 
      price_range, 
      time_range, 
      support_pdf_url,
      contact_pref 
    } = req.body;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    if (!service_provider_id || !request_title || !request_details || !time_range) {
      return res.status(400).json({ 
        error: 'Service provider ID, request title, details, and time range are required' 
      });
    }

    const bookingId = await createServiceBooking({
      user_id,
      service_provider_id: parseInt(service_provider_id),
      request_title,
      request_details,
      price_range: price_range || null,
      time_range,
      support_pdf_url: support_pdf_url || null,
      contact_pref: contact_pref || 'platform'
    });

    res.status(201).json({
      success: true,
      message: 'Service booking request submitted successfully',
      booking_id: bookingId
    });
  } catch (error) {
    console.error('Error booking service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    const bookings = await getUserServiceBookings(user_id);

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { service_provider_id } = req.params;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    const bookings = await getServiceProviderBookings(parseInt(service_provider_id));

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching provider bookings:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

