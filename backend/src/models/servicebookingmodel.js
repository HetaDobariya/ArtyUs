import pool from '../config/db.js';

export const createServiceBooking = async (data) => {
  const {
    user_id,
    service_provider_id,
    request_title,
    request_details,
    price_range,
    time_range,
    support_pdf_url,
    contact_pref
  } = data;

  const query = `
    INSERT INTO service_booking 
    (user_id, service_provider_id, request_title, request_details, price_range, time_range, support_pdf_url, contact_pref, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  const [result] = await pool.query(query, [
    user_id,
    service_provider_id,
    request_title,
    request_details,
    price_range || null,
    time_range || null,
    support_pdf_url || null,
    contact_pref || 'platform'
  ]);

  return result.insertId;
};

export const getUserServiceBookings = async (user_id) => {
  const query = `
    SELECT 
      sb.id,
      sb.request_title,
      sb.request_details,
      sb.price_range,
      sb.time_range,
      sb.status,
      sb.created_at,
      sp.service_name,
      sp.shop_name,
      u.name as provider_name
    FROM service_booking sb
    JOIN service_provider sp ON sb.service_provider_id = sp.id
    JOIN user u ON sp.user_id = u.id
    WHERE sb.user_id = ?
    ORDER BY sb.created_at DESC
  `;

  const [rows] = await pool.query(query, [user_id]);
  return rows;
};

export const getServiceProviderBookings = async (service_provider_id) => {
  const query = `
    SELECT 
      sb.id,
      sb.request_title,
      sb.request_details,
      sb.price_range,
      sb.time_range,
      sb.status,
      sb.created_at,
      sb.contact_pref,
      u.name as customer_name,
      u.email as customer_email,
      u.contact as customer_contact
    FROM service_booking sb
    JOIN user u ON sb.user_id = u.id
    WHERE sb.service_provider_id = ?
    ORDER BY sb.created_at DESC
  `;

  const [rows] = await pool.query(query, [service_provider_id]);
  return rows;
};

