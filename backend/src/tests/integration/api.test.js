import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from '../../routes/userRoutes.js';

// Create test app
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRoutes);

describe('API Integration Tests', () => {
  let authToken;
  let testUserId;

  // Test user data
  const testUser = {
    name: 'Krutarth Patel',
    email: `krutarth.test.${Date.now()}@example.com`,
    address: '123 Test Street, Mumbai, Maharashtra 400001',
    password: 'Test@123',
    contact: '9876543210'
  };

  describe('POST /api/user/signup', () => {
    test('TC-IT-001: Should register new user with valid data', async () => {
      const response = await request(app)
        .post('/api/user/signup')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(response.body).toHaveProperty('userId');
      testUserId = response.body.userId;
    });

    test('TC-IT-002: Should return 409 for duplicate email', async () => {
      const response = await request(app)
        .post('/api/user/signup')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(409);

      expect(response.body).toHaveProperty('error', 'Email is already registered');
    });

    test('TC-IT-003: Should return 400 for missing required fields', async () => {
      const incompleteUser = {
        name: 'Test User',
        email: 'test@example.com'
        // Missing address, password, contact
      };

      const response = await request(app)
        .post('/api/user/signup')
        .send(incompleteUser)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Please provide all required fields');
    });

    test('Should return 400 for missing email', async () => {
      const userWithoutEmail = {
        name: 'Test User',
        address: '123 Street',
        password: 'Test@123',
        contact: '1234567890'
      };

      const response = await request(app)
        .post('/api/user/signup')
        .send(userWithoutEmail)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('Should return 400 for missing password', async () => {
      const userWithoutPassword = {
        name: 'Test User',
        email: 'test2@example.com',
        address: '123 Street',
        contact: '1234567890'
      };

      const response = await request(app)
        .post('/api/user/signup')
        .send(userWithoutPassword)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/user/login', () => {
    test('TC-IT-004: Should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('role');
      expect(response.headers['set-cookie']).toBeDefined();
      
      // Extract token from cookie for subsequent tests
      const cookies = response.headers['set-cookie'];
      const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
      if (tokenCookie) {
        authToken = tokenCookie.split(';')[0].split('=')[1];
      }
    });

    test('TC-IT-005: Should return 401 for invalid password', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword123'
        })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    test('TC-IT-006: Should return 400 for non-existent email', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Test@123'
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error', "Don't have an account");
    });

    test('TC-IT-007: Should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'test@example.com'
          // Missing password
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Please provide all required fields');
    });

    test('Should return 400 for missing email', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          password: 'Test@123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/user/current-user', () => {
    test('TC-IT-008: Should return current user with valid token', async () => {
      if (!authToken) {
        // Login first to get token
        const loginResponse = await request(app)
          .post('/api/user/login')
          .send({
            email: testUser.email,
            password: testUser.password
          });
        
        const cookies = loginResponse.headers['set-cookie'];
        const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
        authToken = tokenCookie.split(';')[0].split('=')[1];
      }

      const response = await request(app)
        .get('/api/user/current-user')
        .set('Cookie', [`token=${authToken}`])
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', testUser.email);
      expect(response.body.user).toHaveProperty('name', testUser.name);
    });

    test('TC-IT-009: Should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/user/current-user')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access denied. No token provided.');
    });

    test('TC-IT-010: Should return 403 with invalid token', async () => {
      const response = await request(app)
        .get('/api/user/current-user')
        .set('Cookie', ['token=invalid.jwt.token'])
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toHaveProperty('error', 'Invalid or expired token');
    });
  });

  describe('PUT /api/user/update', () => {
    test('TC-IT-011: Should update user profile with valid data', async () => {
      if (!authToken) {
        // Login first to get token
        const loginResponse = await request(app)
          .post('/api/user/login')
          .send({
            email: testUser.email,
            password: testUser.password
          });
        
        const cookies = loginResponse.headers['set-cookie'];
        const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
        authToken = tokenCookie.split(';')[0].split('=')[1];
      }

      const updatedData = {
        address: '456 Updated Street, Pune, Maharashtra 411001',
        contact: '9999999999'
      };

      const response = await request(app)
        .put('/api/user/update')
        .set('Cookie', [`token=${authToken}`])
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'User updated successfully');
    });

    test('TC-IT-012: Should return 400 for missing fields', async () => {
      const response = await request(app)
        .put('/api/user/update')
        .set('Cookie', [`token=${authToken}`])
        .send({
          address: '456 Updated Street'
          // Missing contact
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Address and contact are required');
    });

    test('TC-IT-013: Should return 401 without authentication', async () => {
      const response = await request(app)
        .put('/api/user/update')
        .send({
          address: '456 Updated Street',
          contact: '9999999999'
        })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access denied. No token provided.');
    });
  });

  describe('Additional Edge Cases', () => {
    test('Should handle empty request body for signup', async () => {
      const response = await request(app)
        .post('/api/user/signup')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('Should handle empty request body for login', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('Should return proper error for malformed JSON', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .set('Content-Type', 'application/json')
        .send('{"email": "test@example.com", invalid}')
        .expect(400);

      expect(response.status).toBe(400);
    });
  });
});

