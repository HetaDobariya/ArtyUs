import pool from '../config/db.js';

// Get service provider ID by user ID
export const getServiceProviderIdByUserId = async (user_id) => {
  const query = `SELECT id FROM service_provider WHERE user_id = ?`;
  const [rows] = await pool.query(query, [user_id]);
  return rows.length > 0 ? rows[0].id : null;
};

// Create a new service
export const createService = async (data) => {
  const { service_provider_id, name, description, price, image_url } = data;

  const query = `
    INSERT INTO services (service_provider_id, name, description, price, image_url)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(query, [
    service_provider_id,
    name,
    description,
    price || null,
    image_url || null
  ]);

  return result.insertId;
};

// Get all services for a service provider
export const getServicesByServiceProviderId = async (service_provider_id) => {
  const query = `
    SELECT id, name, description, price, image_url, created_at, updated_at
    FROM services
    WHERE service_provider_id = ?
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.query(query, [service_provider_id]);
  return rows;
};

// Get all services (public)
export const getAllServices = async () => {
  const query = `
    SELECT 
      s.id, 
      s.name, 
      s.description, 
      s.price, 
      s.image_url, 
      s.created_at, 
      sp.shop_name, 
      sp.service_name
    FROM services s
    JOIN service_provider sp ON s.service_provider_id = sp.id
    ORDER BY s.created_at DESC
  `;

  const [rows] = await pool.query(query);
  return rows;
};

// Get full service details by ID (public)
export const getServiceDetailsById = async (service_id) => {
  const query = `
    SELECT 
      s.id, 
      s.name, 
      s.description, 
      s.price, 
      s.image_url, 
      s.created_at, 
      sp.id AS service_provider_id,
      sp.shop_name, 
      sp.service_name,
      sp.service_address,
      sp.contact AS service_contact,
      sp.description AS provider_description,
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.address AS user_address
    FROM services s
    JOIN service_provider sp ON s.service_provider_id = sp.id
    JOIN user u ON sp.user_id = u.id
    WHERE s.id = ?
  `;

  const [rows] = await pool.query(query, [service_id]);
  return rows.length > 0 ? rows[0] : null;
};

// Get a single service by ID
export const getServiceById = async (service_id) => {
  const query = `
    SELECT id, service_provider_id, name, description, price, image_url, created_at, updated_at
    FROM services
    WHERE id = ?
  `;

  const [rows] = await pool.query(query, [service_id]);
  return rows.length > 0 ? rows[0] : null;
};

// Update a service
export const updateService = async (service_id, data) => {
  const { name, description, price, image_url } = data;

  const query = `
    UPDATE services
    SET name = ?, description = ?, price = ?, image_url = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [
    name,
    description,
    price || null,
    image_url || null,
    service_id
  ]);

  return result.affectedRows > 0;
};

// Delete a service
export const deleteService = async (service_id) => {
  const query = `DELETE FROM services WHERE id = ?`;
  const [result] = await pool.query(query, [service_id]);
  return result.affectedRows > 0;
};

