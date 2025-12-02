import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { signup, login, currentUser, updateUser } from '../../controller/usercontroller.js';
import * as userModel from '../../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../../models/usermodel.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    // Setup mock request and response objects
    req = {
      body: {},
      user: {},
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('signup', () => {
    test('TC-UT-005: Should create user successfully with valid data', async () => {
      // Arrange
      req.body = {
        name: 'Krutarth Patel',
        email: 'krutarth@example.com',
        address: '123 Test Street, Mumbai',
        password: 'Test@123',
        contact: '9876543210'
      };
      userModel.findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('$2b$10$hashedpassword');
      userModel.createUser.mockResolvedValue(1);

      // Act
      await signup(req, res);

      // Assert
      expect(userModel.findUserByEmail).toHaveBeenCalledWith('krutarth@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('Test@123', 10);
      expect(userModel.createUser).toHaveBeenCalledWith({
        name: 'Krutarth Patel',
        email: 'krutarth@example.com',
        address: '123 Test Street, Mumbai',
        password: '$2b$10$hashedpassword',
        contact: '9876543210'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        userId: 1
      });
    });

    test('TC-UT-006: Should return 400 when required fields are missing', async () => {
      // Arrange
      req.body = {
        name: 'Test User',
        email: 'test@example.com'
        // Missing address, password, contact
      };

      // Act
      await signup(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Please provide all required fields'
      });
      expect(userModel.findUserByEmail).not.toHaveBeenCalled();
    });

    test('TC-UT-007: Should return 409 when email already exists', async () => {
      // Arrange
      req.body = {
        name: 'Test User',
        email: 'existing@example.com',
        address: '123 Street',
        password: 'Test@123',
        contact: '1234567890'
      };
      userModel.findUserByEmail.mockResolvedValue({
        id: 1,
        email: 'existing@example.com'
      });

      // Act
      await signup(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Email is already registered'
      });
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(userModel.createUser).not.toHaveBeenCalled();
    });

    test('Should return 500 on database error', async () => {
      // Arrange
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        address: '123 Street',
        password: 'Test@123',
        contact: '1234567890'
      };
      userModel.findUserByEmail.mockRejectedValue(new Error('Database error'));

      // Act
      await signup(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Internal server error'
      });
    });
  });

  describe('login', () => {
    test('TC-UT-008: Should login successfully with valid credentials', async () => {
      // Arrange
      req.body = {
        email: 'krutarth@example.com',
        password: 'Test@123'
      };
      const mockUser = {
        id: 1,
        name: 'Krutarth Patel',
        email: 'krutarth@example.com',
        address: '123 Test Street',
        contact: '9876543210',
        password: '$2b$10$hashedpassword',
        is_trader: 0
      };
      userModel.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mock.jwt.token');

      // Act
      await login(req, res);

      // Assert
      expect(userModel.findUserByEmail).toHaveBeenCalledWith('krutarth@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('Test@123', '$2b$10$hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: 1,
          name: 'Krutarth Patel',
          email: 'krutarth@example.com',
          address: '123 Test Street',
          contact: '9876543210'
        },
        expect.any(String),
        { expiresIn: '1h' }
      );
      expect(res.cookie).toHaveBeenCalledWith('token', 'mock.jwt.token', expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        user: { role: 'user' }
      });
    });

    test('TC-UT-009: Should return 401 with invalid password', async () => {
      // Arrange
      req.body = {
        email: 'test@example.com',
        password: 'WrongPassword'
      };
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: '$2b$10$hashedpassword'
      };
      userModel.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      // Act
      await login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid credentials'
      });
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test('TC-UT-010: Should return 400 when user does not exist', async () => {
      // Arrange
      req.body = {
        email: 'nonexistent@example.com',
        password: 'Test@123'
      };
      userModel.findUserByEmail.mockResolvedValue(null);

      // Act
      await login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Don't have an account"
      });
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    test('Should return 400 when email or password is missing', async () => {
      // Arrange
      req.body = {
        email: 'test@example.com'
        // Missing password
      };

      // Act
      await login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Please provide all required fields'
      });
    });

    test('Should set role as trader for trader users', async () => {
      // Arrange
      req.body = {
        email: 'trader@example.com',
        password: 'Test@123'
      };
      const mockTrader = {
        id: 2,
        name: 'Trader User',
        email: 'trader@example.com',
        address: '456 Trade Street',
        contact: '9876543211',
        password: '$2b$10$hashedpassword',
        is_trader: 1
      };
      userModel.findUserByEmail.mockResolvedValue(mockTrader);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mock.jwt.token');

      // Act
      await login(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        user: { role: 'trader' }
      });
    });
  });

  describe('currentUser', () => {
    test('Should return current user data', async () => {
      // Arrange
      req.user = {
        id: 1,
        name: 'Krutarth Patel',
        email: 'krutarth@example.com',
        address: '123 Test Street',
        contact: '9876543210'
      };

      // Act
      await currentUser(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({
        user: req.user
      });
    });

    test('Should return 500 on error', async () => {
      // Arrange
      req.user = null;
      res.json.mockImplementation(() => {
        throw new Error('Internal error');
      });

      // Act
      await currentUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateUser', () => {
    test('Should update user successfully with valid data', async () => {
      // Arrange
      req.user = { id: 1 };
      req.body = {
        address: '456 New Street',
        contact: '1111111111'
      };
      userModel.updateUserById.mockResolvedValue({ affectedRows: 1 });

      // Act
      await updateUser(req, res);

      // Assert
      expect(userModel.updateUserById).toHaveBeenCalledWith(1, '456 New Street', '1111111111');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User updated successfully'
      });
    });

    test('Should return 400 when required fields are missing', async () => {
      // Arrange
      req.user = { id: 1 };
      req.body = {
        address: '456 New Street'
        // Missing contact
      };

      // Act
      await updateUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Address and contact are required'
      });
      expect(userModel.updateUserById).not.toHaveBeenCalled();
    });

    test('Should return 404 when user not found', async () => {
      // Arrange
      req.user = { id: 999 };
      req.body = {
        address: '456 New Street',
        contact: '1111111111'
      };
      userModel.updateUserById.mockResolvedValue({ affectedRows: 0 });

      // Act
      await updateUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'User not found or no changes made'
      });
    });

    test('Should return 500 on database error', async () => {
      // Arrange
      req.user = { id: 1 };
      req.body = {
        address: '456 New Street',
        contact: '1111111111'
      };
      userModel.updateUserById.mockRejectedValue(new Error('Database error'));

      // Act
      await updateUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Internal server error'
      });
    });
  });
});

