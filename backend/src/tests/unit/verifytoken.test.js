import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { verifyToken } from '../../middleware/verifytoken.js';
import jwt from 'jsonwebtoken';

// Mock JWT
jest.mock('jsonwebtoken');

describe('Verify Token Middleware Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    jest.clearAllMocks();
    
    // Set environment variable for tests
    process.env.JWT_SECRET = 'test-secret-key';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('verifyToken', () => {
    test('TC-UT-011: Should verify valid token and call next()', () => {
      // Arrange
      const mockToken = 'valid.jwt.token';
      const mockDecoded = {
        id: 1,
        name: 'Krutarth Patel',
        email: 'krutarth@example.com',
        address: '123 Test Street',
        contact: '9876543210'
      };
      req.cookies.token = mockToken;
      jwt.verify.mockReturnValue(mockDecoded);

      // Act
      verifyToken(req, res, next);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key');
      expect(req.user).toEqual(mockDecoded);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('TC-UT-012: Should return 401 when token is not provided', () => {
      // Arrange
      req.cookies.token = undefined;

      // Act
      verifyToken(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Access denied. No token provided.'
      });
      expect(next).not.toHaveBeenCalled();
      expect(jwt.verify).not.toHaveBeenCalled();
    });

    test('TC-UT-013: Should return 403 when token is invalid', () => {
      // Arrange
      req.cookies.token = 'invalid.token';
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act
      verifyToken(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token'
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('Should return 403 when token is expired', () => {
      // Arrange
      req.cookies.token = 'expired.token';
      const tokenExpiredError = new Error('jwt expired');
      tokenExpiredError.name = 'TokenExpiredError';
      jwt.verify.mockImplementation(() => {
        throw tokenExpiredError;
      });

      // Act
      verifyToken(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token'
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('Should handle malformed token', () => {
      // Arrange
      req.cookies.token = 'malformed-token';
      const malformedError = new Error('jwt malformed');
      malformedError.name = 'JsonWebTokenError';
      jwt.verify.mockImplementation(() => {
        throw malformedError;
      });

      // Act
      verifyToken(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token'
      });
    });

    test('Should set req.user with all decoded properties', () => {
      // Arrange
      const mockToken = 'valid.jwt.token';
      const mockDecoded = {
        id: 5,
        name: 'Test User',
        email: 'test@example.com',
        address: '789 Test Avenue',
        contact: '5555555555',
        iat: 1234567890,
        exp: 1234571490
      };
      req.cookies.token = mockToken;
      jwt.verify.mockReturnValue(mockDecoded);

      // Act
      verifyToken(req, res, next);

      // Assert
      expect(req.user).toEqual(mockDecoded);
      expect(req.user.id).toBe(5);
      expect(req.user.email).toBe('test@example.com');
    });
  });
});

