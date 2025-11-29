# Changelog

All notable changes to the ArtyUs project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Payment gateway integration
- Advanced search with filters
- Product reviews and ratings
- Real-time notifications
- Order tracking system
- Wishlist functionality
- Multi-language support

## [1.0.0] - 2025-11-13

### Added

#### Authentication & Authorization
- JWT-based authentication system
- Multi-role user system (User, Trader, Service Provider, Admin)
- Secure password hashing with bcrypt
- Token-based session management
- Role-based access control

#### Product Management
- Product CRUD operations
- Category-based product browsing
- Dynamic product pages with slug routing
- Image upload integration with Cloudinary
- Product search and filtering
- Trader-specific product management

#### User Features
- User registration and login
- Profile management
- Order history tracking
- Edit user details functionality

#### Trader Features
- Trader registration and verification
- Add, edit, delete products
- Manage product inventory
- View trader-specific products
- Product image uploads

#### Service Provider Features
- Service provider registration
- Service listing management
- Profile management
- Verification system

#### Admin Features
- Admin dashboard
- User management (view, update, delete)
- Trader verification and management
- Service provider verification and management
- Product oversight
- Category and slug management
- Platform analytics

#### Frontend
- Responsive Next.js 15 application
- TypeScript implementation
- Tailwind CSS styling
- Material-UI components
- Dynamic routing for categories and products
- User context for global state management
- Loading states and error handling
- Mobile-responsive design

#### Backend
- RESTful API with Express.js
- MySQL database integration
- Connection pooling for database
- Environment-based configuration
- CORS middleware
- Cookie parser for token management
- Organized MVC architecture

### Technical Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MySQL 2
- **Authentication**: JWT, bcrypt
- **Image Management**: Cloudinary
- **Development Tools**: Nodemon, ESLint

### API Endpoints

#### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/signin` - User login
- `POST /api/trader/signup` - Trader registration
- `POST /api/trader/signin` - Trader login
- `POST /api/serviceprovider/signup` - Service provider registration
- `POST /api/serviceprovider/signin` - Service provider login

#### Products
- `GET /api/product/getproducts` - Get all products
- `GET /api/product/:id` - Get single product
- `GET /api/product/category/:category` - Get products by category
- `POST /api/product/add-product` - Add new product (Auth required)
- `PUT /api/product/update/:id` - Update product (Auth required)
- `DELETE /api/product/delete/:id` - Delete product (Auth required)
- `GET /api/product/my-products` - Get trader's products (Auth required)

#### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/user/:id` - Update user
- `DELETE /api/admin/user/:id` - Delete user
- `GET /api/admin/traders` - Get all traders
- `PUT /api/admin/trader/:id` - Update trader
- `DELETE /api/admin/trader/:id` - Delete trader
- `GET /api/admin/service-providers` - Get all service providers
- `PUT /api/admin/service-provider/:id` - Update service provider
- `DELETE /api/admin/service-provider/:id` - Delete service provider

#### Categories
- `GET /api/category/getcategories` - Get all categories
- `POST /api/category/add-category` - Add new category (Auth required)

### Documentation
- Comprehensive README.md
- Contributing guidelines (CONTRIBUTING.md)
- Quick start guide (QUICK_START.md)
- ISC License
- Environment variable documentation

### Security
- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- CORS protection
- Environment variable protection
- SQL injection prevention with parameterized queries

### Database Schema
- Users table
- Traders table
- Service providers table
- Products table
- Categories table
- Slugs table

## [0.1.0] - Initial Development

### Added
- Initial project setup
- Basic folder structure
- Database schema design
- Authentication prototype

---

## Version History Legend

### Types of Changes
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Version Format
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, backward compatible

---

**Last Updated**: November 13, 2025



