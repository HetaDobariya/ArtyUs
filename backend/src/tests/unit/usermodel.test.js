import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { findUserByEmail, createUser, updateUserById } from '../../models/usermodel.js';
import pool from '../../config/db.js';

// Mock the database pool
jest.mock('../../config/db.js', () => ({
  default: {
    query: jest.fn(),
  },
}));

describe('User Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findUserByEmail', () => {
    test('TC-UT-001: Should return user when email exists', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        address: '123 Test St',
        contact: '1234567890',
        password: '$2b$10$hashedpassword',
        is_trader: 0,
        is_admin: 0,
        is_verified: 1
      };
      pool.query.mockResolvedValue([[mockUser], []]);

      // Act
      const result = await findUserByEmail('test@example.com');

      // Assert
      expect(result).toEqual(mockUser);
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM user WHERE email = ?',
        ['test@example.com']
      );
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

    test('TC-UT-002: Should return undefined when email does not exist', async () => {
      // Arrange
      pool.query.mockResolvedValue([[], []]);

      // Act
      const result = await findUserByEmail('nonexistent@example.com');

      // Assert
      expect(result).toBeUndefined();
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM user WHERE email = ?',
        ['nonexistent@example.com']
      );
    });

    test('Should handle database errors gracefully', async () => {
      // Arrange
      const dbError = new Error('Database connection failed');
      pool.query.mockRejectedValue(dbError);

      // Act & Assert
      await expect(findUserByEmail('test@example.com')).rejects.toThrow('Database connection failed');
    });
  });

  describe('createUser', () => {
    test('TC-UT-003: Should create user and return insertId', async () => {
      // Arrange
      const newUser = {
        name: 'New User',
        email: 'new@example.com',
        address: '456 New St',
        password: '$2b$10$hashedpassword',
        contact: '9876543210'
      };
      const mockResult = { insertId: 123, affectedRows: 1 };
      pool.query.mockResolvedValue([mockResult, []]);

      // Act
      const result = await createUser(newUser);

      // Assert
      expect(result).toBe(123);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO user'),
        [newUser.name, newUser.email, newUser.address, newUser.password, newUser.contact]
      );
    });

    test('Should handle duplicate email error', async () => {
      // Arrange
      const duplicateUser = {
        name: 'Duplicate User',
        email: 'existing@example.com',
        address: '789 Duplicate St',
        password: '$2b$10$hashedpassword',
        contact: '5555555555'
      };
      const dbError = new Error('ER_DUP_ENTRY');
      dbError.code = 'ER_DUP_ENTRY';
      pool.query.mockRejectedValue(dbError);

      // Act & Assert
      await expect(createUser(duplicateUser)).rejects.toThrow();
    });
  });

  describe('updateUserById', () => {
    test('TC-UT-004: Should update user and return result', async () => {
      // Arrange
      const userId = 1;
      const newAddress = '999 Updated St';
      const newContact = '1111111111';
      const mockResult = { affectedRows: 1, changedRows: 1 };
      pool.query.mockResolvedValue([mockResult, []]);

      // Act
      const result = await updateUserById(userId, newAddress, newContact);

      // Assert
      expect(result.affectedRows).toBe(1);
      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE user SET address = ?, contact = ?, update_at = NOW() WHERE id = ?',
        [newAddress, newContact, userId]
      );
    });

    test('Should return zero affectedRows when user not found', async () => {
      // Arrange
      const mockResult = { affectedRows: 0, changedRows: 0 };
      pool.query.mockResolvedValue([mockResult, []]);

      // Act
      const result = await updateUserById(999, 'Address', '1234567890');

      // Assert
      expect(result.affectedRows).toBe(0);
    });

    test('Should handle database errors during update', async () => {
      // Arrange
      const dbError = new Error('Database error');
      pool.query.mockRejectedValue(dbError);

      // Act & Assert
      await expect(updateUserById(1, 'Address', '1234567890')).rejects.toThrow('Database error');
    });
  });
});

