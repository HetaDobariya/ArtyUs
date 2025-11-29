# ArtyUs Architecture Documentation

This document provides an overview of the ArtyUs platform architecture, design decisions, and system components.

## 📐 System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Layer                            │
│  (Web Browser - Desktop/Mobile)                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTPS
                 │
┌────────────────▼────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  Next.js 15 (React 18) + TypeScript + Tailwind CSS         │
│  • Server-Side Rendering (SSR)                              │
│  • Dynamic Routing                                           │
│  • Image Optimization                                        │
│  • State Management (Context API)                           │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ REST API (HTTP/JSON)
                 │
┌────────────────▼────────────────────────────────────────────┐
│                    Backend Layer                             │
│  Node.js + Express.js                                        │
│  • RESTful API                                               │
│  • JWT Authentication                                        │
│  • Middleware (CORS, Cookie Parser)                         │
│  • MVC Architecture                                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ MySQL2 Driver
                 │
┌────────────────▼────────────────────────────────────────────┐
│                   Database Layer                             │
│  MySQL 8                                                     │
│  • Relational Database                                       │
│  • Connection Pooling                                        │
│  • Indexed Tables                                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 External Services                            │
│  Cloudinary (Image Storage & CDN)                           │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Frontend Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Material-UI, Headless UI
- **State Management**: React Context API
- **Form Handling**: Formik + Yup validation
- **HTTP Client**: Fetch API (native)

### Directory Structure

```
frontend/src/
├── app/                          # Next.js App Router
│   ├── [category]/              # Dynamic category routes
│   │   ├── [id]/               # Dynamic product detail routes
│   │   │   └── page.tsx        # Product detail page
│   │   └── page.tsx            # Category listing page
│   ├── modules/                 # Feature modules
│   │   ├── auth/               # Authentication pages
│   │   │   ├── SignIn/
│   │   │   ├── SignUp/
│   │   │   ├── TraderSignUp/
│   │   │   └── ServiceProviderSignup/
│   │   ├── dashboard/          # Role-based dashboards
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── trader/         # Trader dashboard
│   │   │   ├── sp/             # Service provider dashboard
│   │   │   └── user/           # User dashboard
│   │   ├── Home/               # Homepage components
│   │   ├── Products/           # Product pages
│   │   ├── AboutUs/
│   │   └── Blog/
│   ├── profile/                # User profile pages
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                  # Shared components
│   ├── Navbar.tsx
│   └── Footer.tsx
├── contexts/                    # React contexts
│   └── UserContext.tsx         # User authentication state
└── types/                       # TypeScript type definitions
    └── index.ts
```

### Key Design Patterns

#### 1. Server-Side Rendering (SSR)
- Product pages are rendered on the server for SEO
- Dynamic routes for categories and products
- Static assets served via CDN

#### 2. Client-Side Rendering (CSR)
- Dashboard components for interactivity
- Real-time updates and user interactions
- Form submissions

#### 3. Context-Based State Management
```typescript
UserContext
├── User State (isAuthenticated, userData, role)
├── Actions (login, logout, updateProfile)
└── Effects (fetch user data, refresh token)
```

## 🔧 Backend Architecture

### Technology Stack
- **Runtime**: Node.js v18+
- **Framework**: Express.js v5
- **Database**: MySQL 8
- **Authentication**: JWT + bcrypt
- **ORM**: Raw SQL with mysql2

### Directory Structure

```
backend/src/
├── config/
│   └── db.js                   # Database connection pool
├── middleware/
│   └── verifytoken.js         # JWT authentication middleware
├── models/                     # Data access layer
│   ├── adminmodel.js
│   ├── categorymodel.js
│   ├── productmodel.js
│   ├── serviceprovidermodel.js
│   ├── tradermodel.js
│   └── usermodel.js
├── controller/                 # Business logic layer
│   ├── admincontroller.js
│   ├── categorycontroller.js
│   ├── productcontroller.js
│   ├── serviceprovidercontroller.js
│   ├── tradercontroller.js
│   └── usercontroller.js
├── routes/                     # API routes
│   ├── adminRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── serviceProviderRoutes.js
│   ├── traderRoutes.js
│   └── userRoutes.js
└── index.js                    # Application entry point
```

### MVC Architecture

```
Request Flow:
Client Request → Route → Middleware → Controller → Model → Database
                                                      ↓
Client Response ← Controller ← Model ← Database Query Result
```

#### Example Flow: Get Product

```
1. GET /api/product/123
   ↓
2. productRoutes.js → router.get('/:id', getProduct)
   ↓
3. verifytoken.js (if auth required)
   ↓
4. productcontroller.js → getProduct(req, res)
   ↓
5. productmodel.js → getProductById(123)
   ↓
6. MySQL Query → SELECT * FROM products WHERE id = 123
   ↓
7. Return product data through controller
   ↓
8. JSON response to client
```

### API Design Principles

#### RESTful Conventions
- **GET**: Retrieve resources
- **POST**: Create resources
- **PUT**: Update resources
- **DELETE**: Remove resources

#### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "error": "Error message (if failed)"
}
```

#### Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## 🗄️ Database Architecture

### Entity-Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    Users    │       │   Traders   │       │  Products   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │──────▶│ trader_id   │
│ name        │       │ user_id(FK) │       │ name        │
│ email       │◀──────│ company     │       │ slug_id(FK) │
│ password    │       │ verified    │       │ price       │
│ phone       │       │ ...         │       │ quantity    │
│ ...         │       └─────────────┘       │ image_url   │
└─────────────┘                             │ ...         │
                                            └─────────────┘
       │                                           │
       │                                           │
       │                                           ▼
       │                                    ┌─────────────┐
       │                                    │  Categories │
       │                                    ├─────────────┤
       │                                    │ id (PK)     │
       │                                    │ slug_name   │
       │                                    │ ...         │
       │                                    └─────────────┘
       │
       ▼
┌─────────────────┐
│ServiceProviders │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ service_type    │
│ verified        │
│ ...             │
└─────────────────┘
```

### Key Tables

#### users
- Primary user accounts
- Email-based authentication
- Password hashing with bcrypt

#### traders
- Extends users for sellers
- Company information
- Verification status

#### service_providers
- Service-based accounts
- Service type classification
- Verification workflow

#### products
- Product catalog
- Links to traders
- Category association
- Image URLs (Cloudinary)

#### categories
- Product categorization
- URL-friendly slugs
- Hierarchical structure support

### Indexing Strategy

```sql
-- Performance optimization indexes
CREATE INDEX idx_products_trader ON products(trader_id);
CREATE INDEX idx_products_slug ON products(slug_id);
CREATE INDEX idx_traders_verified ON traders(verified);
CREATE INDEX idx_users_email ON users(email);
```

## 🔐 Authentication & Authorization

### Authentication Flow

```
1. User submits credentials (email, password)
   ↓
2. Backend validates credentials
   ↓
3. Hash password comparison (bcrypt)
   ↓
4. Generate JWT token
   ↓
5. Send token in HTTP-only cookie
   ↓
6. Client stores token
   ↓
7. Subsequent requests include token
   ↓
8. Middleware verifies token
   ↓
9. Request proceeds with user context
```

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "123",
    "email": "user@example.com",
    "role": "trader",
    "iat": 1234567890,
    "exp": 1234571490
  },
  "signature": "..."
}
```

### Authorization Levels

| Role | Permissions |
|------|------------|
| **User** | Browse products, make purchases, manage profile |
| **Trader** | All user permissions + manage own products |
| **Service Provider** | All user permissions + manage services |
| **Admin** | Full platform access, user management |

### Middleware Protection

```javascript
Protected Routes:
- /api/product/add-product (Trader only)
- /api/admin/* (Admin only)
- /api/trader/my-products (Trader only)
- /api/user/profile (Authenticated users)
```

## 🖼️ Image Management

### Cloudinary Integration

```
Upload Flow:
1. User selects image (frontend)
   ↓
2. Frontend uploads to Cloudinary
   ↓
3. Cloudinary returns image URL
   ↓
4. URL saved to database
   ↓
5. Images served via Cloudinary CDN
```

### Benefits
- ✅ CDN distribution
- ✅ Automatic optimization
- ✅ Responsive images
- ✅ Image transformations
- ✅ Reduced server load

## 🚀 Performance Considerations

### Frontend Optimization
1. **Next.js Image Component**: Automatic image optimization
2. **Code Splitting**: Route-based chunking
3. **Server Components**: Reduced client-side JavaScript
4. **Static Generation**: Pre-rendered pages when possible
5. **Caching**: Browser and CDN caching

### Backend Optimization
1. **Connection Pooling**: Reuse database connections
2. **Query Optimization**: Indexed queries
3. **Middleware Caching**: Token verification caching
4. **Error Handling**: Graceful error responses
5. **Rate Limiting**: (Future implementation)

### Database Optimization
1. **Indexes**: On frequently queried columns
2. **Connection Pooling**: Max 100 connections
3. **Query Optimization**: Avoid N+1 queries
4. **Data Types**: Appropriate column types

## 🔒 Security Measures

### Application Security
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ HTTP-only cookies
- ✅ CORS configuration
- ✅ Environment variables
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection

### Data Security
- ✅ Encrypted passwords
- ✅ Secure token storage
- ✅ Database access control
- ✅ Environment-based configs

## 📈 Scalability Considerations

### Current Architecture
- Monolithic application
- Single database instance
- Suitable for small to medium traffic

### Future Scaling Options

#### Horizontal Scaling
```
Load Balancer
    ├── App Server 1
    ├── App Server 2
    └── App Server 3
         ↓
    Database Cluster
```

#### Vertical Scaling
- Increase server resources
- Database optimization
- Caching layer (Redis)

#### Microservices (Future)
- User Service
- Product Service
- Order Service
- Notification Service

## 🧪 Testing Strategy

### Recommended Testing Approach

#### Unit Tests
- Model functions
- Utility functions
- Helper methods

#### Integration Tests
- API endpoints
- Database operations
- Authentication flow

#### E2E Tests
- User registration flow
- Product purchase flow
- Admin operations

### Testing Tools (Suggested)
- Jest for unit tests
- Supertest for API tests
- Cypress for E2E tests

## 📊 Monitoring & Logging

### Current Implementation
- Console logging
- Error tracking
- Request logging

### Future Enhancements
- Centralized logging (Winston)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Analytics (Google Analytics)

## 🔄 Deployment Strategy

### Recommended Deployment

#### Frontend (Next.js)
- **Vercel** (Recommended) - Native Next.js support
- **Netlify** - Alternative
- **AWS Amplify** - Alternative

#### Backend (Node.js)
- **Heroku** - Simple deployment
- **AWS EC2** - Full control
- **DigitalOcean** - Cost-effective
- **Railway** - Modern platform

#### Database (MySQL)
- **AWS RDS** - Managed MySQL
- **PlanetScale** - Serverless MySQL
- **DigitalOcean Managed Databases**

#### Images (Cloudinary)
- Already cloud-based ✅

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Document Version**: 1.0.0  
**Last Updated**: November 13, 2025  
**Maintainer**: ArtyUs Development Team



