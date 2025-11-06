# ArtyUs Test Plan Document

**Project**: ArtyUs - Art and Craft E-commerce Platform  
**Version**: 1.0  
**Date**: November 5, 2025  
**Due Date**: November 6, 2025

---

## 1. Introduction

### 1.1 Purpose
This document outlines the comprehensive testing strategy for the ArtyUs application, including unit tests, integration tests, UI tests, and database validation.

### 1.2 Scope
The testing covers:
- Backend API endpoints and controllers
- Database models and operations
- Authentication and authorization middleware
- Frontend components and user interactions
- Database integrity and data validation

### 1.3 Testing Objectives
- Ensure all API endpoints function correctly
- Validate user authentication and authorization flows
- Verify database operations and data integrity
- Test frontend component rendering and user interactions
- Identify and document bugs

---

## 2. Test Strategy

### 2.1 Unit Testing
**Framework**: Jest  
**Coverage**: 
- User Model functions (findUserByEmail, createUser, updateUserById)
- User Controller functions (signup, login, currentUser, updateUser)
- JWT Token verification middleware

**Target Coverage**: > 80%

### 2.2 Integration Testing
**Framework**: Jest + Supertest  
**Coverage**:
- POST /api/user/signup - User registration
- POST /api/user/login - User authentication
- GET /api/user/current-user - Get authenticated user info
- PUT /api/user/update - Update user profile

### 2.3 Database Testing
**Framework**: Custom seeding scripts  
**Coverage**:
- Database connection validation
- CRUD operations
- Data integrity constraints
- Sample data population

### 2.4 UI Testing
**Framework**: Jest + React Testing Library  
**Coverage**:
- Component rendering tests
- Form validation tests
- User interaction simulations
- Navigation tests

---

## 3. Test Environment

### 3.1 Backend Testing
- **Runtime**: Node.js
- **Database**: MySQL (Test Database)
- **Port**: 5000 (or configured)
- **Dependencies**: Express, JWT, bcrypt

### 3.2 Frontend Testing
- **Framework**: Next.js
- **Runtime**: React 19
- **Testing Library**: React Testing Library
- **Dependencies**: Material-UI, Formik, Yup

### 3.3 Test Database
- **Name**: artyus_test
- **Configuration**: Separate from production
- **Data**: Seeded with meaningful test records

---

## 4. Test Cases Summary

### 4.1 Backend Unit Tests
| Test ID | Test Case | Priority |
|---------|-----------|----------|
| UT-001 | Find user by email - existing user | High |
| UT-002 | Find user by email - non-existing user | High |
| UT-003 | Create user with valid data | High |
| UT-004 | Update user by ID | Medium |
| UT-005 | Verify valid JWT token | High |
| UT-006 | Reject invalid JWT token | High |
| UT-007 | Password hashing validation | High |

### 4.2 Backend Integration Tests
| Test ID | Test Case | Priority |
|---------|-----------|----------|
| IT-001 | Signup with valid credentials | High |
| IT-002 | Signup with existing email (409 error) | High |
| IT-003 | Signup with missing fields (400 error) | High |
| IT-004 | Login with valid credentials | High |
| IT-005 | Login with invalid credentials | High |
| IT-006 | Login with missing fields | High |
| IT-007 | Get current user with valid token | High |
| IT-008 | Get current user without token (401 error) | High |
| IT-009 | Update user profile with valid data | Medium |
| IT-010 | Update user profile with missing fields | Medium |

### 4.3 Frontend UI Tests
| Test ID | Test Case | Priority |
|---------|-----------|----------|
| UI-001 | Render SignUp component | High |
| UI-002 | Submit SignUp form with valid data | High |
| UI-003 | Display validation errors on SignUp | High |
| UI-004 | Render SignIn component | High |
| UI-005 | Submit SignIn form with valid data | High |
| UI-006 | Display validation errors on SignIn | High |
| UI-007 | Render Navbar component | Medium |
| UI-008 | Navigate through links | Medium |

### 4.4 Database Tests
| Test ID | Test Case | Priority |
|---------|-----------|----------|
| DB-001 | Database connection successful | Critical |
| DB-002 | Seed users table with test data | High |
| DB-003 | Verify unique email constraint | High |
| DB-004 | Verify data types and constraints | High |

---

## 5. Test Execution

### 5.1 Running Tests

#### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:unit          # Run unit tests only
npm run test:integration   # Run integration tests only
npm run test:coverage      # Run with coverage report
```

#### Frontend Tests
```bash
cd frontend
npm test                   # Run all tests
npm run test:watch        # Run in watch mode
npm run test:coverage     # Run with coverage report
```

#### Database Seeding
```bash
cd backend
npm run seed              # Populate database with test data
```

### 5.2 Test Schedule
- **Phase 1**: Unit Tests - November 5, 2025
- **Phase 2**: Integration Tests - November 5, 2025
- **Phase 3**: Database Seeding - November 5, 2025
- **Phase 4**: UI Tests - November 5, 2025
- **Phase 5**: Bug Fixes & Documentation - November 6, 2025

---

## 6. Defect Management

### 6.1 Bug Severity Levels
- **Critical**: System crash, data loss
- **High**: Major functionality broken
- **Medium**: Minor functionality issues
- **Low**: UI/UX issues, cosmetic problems

### 6.2 Bug Tracking
All bugs are documented in `BUG_LOG.md` with:
- Bug ID
- Description
- Severity
- Steps to reproduce
- Expected vs Actual behavior
- Status (Open/In Progress/Resolved/Closed)

---

## 7. Exit Criteria

Testing is considered complete when:
- [ ] All unit tests pass with >80% coverage
- [ ] All integration tests pass
- [ ] Database is successfully seeded
- [ ] All critical and high-priority bugs are resolved
- [ ] Test documentation is complete
- [ ] Test results are documented

---

## 8. Deliverables

1. **Test Documentation**
   - Test Plan (this document)
   - Test Cases Document
   - Bug Log

2. **Test Implementation**
   - Unit test files
   - Integration test files
   - UI test files
   - Database seeding scripts

3. **Test Results**
   - Test execution reports
   - Coverage reports
   - Bug reports

---

## 9. Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Test environment setup delays | Medium | Use Docker for consistent environment |
| Database connection issues | High | Use test database with mock data |
| Insufficient test coverage | Medium | Focus on critical paths first |
| Time constraints | High | Prioritize high-priority tests |

---

## 10. Approval

**Prepared by**: Development Team  
**Reviewed by**: Project Manager  
**Approved by**: Technical Lead  

**Date**: November 5, 2025

