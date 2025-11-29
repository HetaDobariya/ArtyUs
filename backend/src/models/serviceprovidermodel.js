import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

export const createUser = async ({ name, email, address, password, contactNumber }) => {
  const sql = `
    INSERT INTO user (name, email, address, password, contact, is_admin, is_trader, is_serviceprovider, is_verified, created_at, update_at)
    VALUES (?, ?, ?, ?, ?, 0, 0, 1, 0, NOW(), NOW())
  `;
  const [result] = await pool.query(sql, [name, email, address, password, contactNumber]);
  return result.insertId;
};

export const createServiceProvider = async ({
  userId,
  serviceName,
  shopName,
  serviceAddress,
  description,
  contact,
}) => {
  const sql = `
    INSERT INTO service_provider (user_id, service_name, shop_name, service_address, description, contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(sql, [userId, serviceName, shopName, serviceAddress, description, contact]);
  return result.insertId;
};

export const verifyServiceProviderById = async (id) => {
  const sql = `
    UPDATE user
    SET is_verified = 1
    WHERE id = ? AND is_serviceprovider = 1
  `;
  const [result] = await pool.query(sql, [id]);
  return result;
};

export const getUnverifiedServiceProviderList = async () => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.contact,
      u.address,
      s.id AS service_provider_id,
      s.service_name,
      s.shop_name,
      s.service_address,
      s.description
    FROM user u
    JOIN service_provider s ON u.id = s.user_id
    WHERE u.is_serviceprovider = 1 AND u.is_verified = 0
    ORDER BY s.id DESC;
  `;
  const [rows] = await pool.query(sql);
  return rows;
};


export const getAllServiceProvidersFromDB = async () => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.contact AS user_contact,
      u.address AS user_address,
      u.is_verified,
      u.created_at,
      s.id AS service_provider_id,
      s.service_name,
      s.shop_name,
      s.service_address,
      s.description,
      s.contact AS service_contact
    FROM user u
    JOIN service_provider s ON u.id = s.user_id
    WHERE u.is_serviceprovider = 1
    ORDER BY s.id DESC;
  `;
  const [rows] = await pool.query(sql);
  return rows;
};

export const getServiceProviderByIdFromDB = async (serviceProviderId) => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.contact AS user_contact,
      u.address AS user_address,
      u.is_verified,
      u.created_at,
      s.id AS service_provider_id,
      s.service_name,
      s.shop_name,
      s.service_address,
      s.description,
      s.contact AS service_contact
    FROM user u
    JOIN service_provider s ON u.id = s.user_id
    WHERE s.id = ? AND u.is_serviceprovider = 1;
  `;
  const [rows] = await pool.query(sql, [serviceProviderId]);
  return rows[0];
};

export const getServiceProviderByUserIdFromDB = async (userId) => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.contact AS user_contact,
      u.address AS user_address,
      u.is_verified,
      u.created_at,
      s.id AS service_provider_id,
      s.service_name,
      s.shop_name,
      s.service_address,
      s.description,
      s.contact AS service_contact
    FROM user u
    JOIN service_provider s ON u.id = s.user_id
    WHERE u.id = ? AND u.is_serviceprovider = 1;
  `;
  const [rows] = await pool.query(sql, [userId]);
  return rows[0];
};