# ArtyUs 🎨

**ArtyUs** is a comprehensive e-commerce platform designed for buying and selling art supplies, stationery, and craft materials. The platform connects users, traders, and service providers in a seamless marketplace experience.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [User Roles](#user-roles)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### General Features
- 🔐 **Multi-Role Authentication System** (User, Trader, Service Provider, Admin)
- 🛒 **Dynamic Product Catalog** with category-based browsing
- 🎯 **Advanced Search & Filtering**
- 📱 **Responsive Design** for all devices
- 🔒 **Secure JWT-based Authentication**
- 📦 **Order Management System**
- 💳 **User Profile Management**

### User Features
- Browse products by category
- View detailed product information
- Order history tracking
- Edit profile information

### Trader Features
- Add, edit, and delete products
- Manage product inventory
- Track trader-specific products
- Upload product images via Cloudinary

### Service Provider Features
- Service listing management
- Order tracking
- Profile management
- Verification system

### Admin Features
- User management (view, update, delete)
- Trader verification and management
- Service provider verification
- Product oversight
- Category and slug management
- Platform analytics dashboard

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Material-UI, Headless UI
- **State Management:** React Context API
- **Form Handling:** Formik & Yup
- **HTTP Client:** Axios
- **Image Handling:** Next.js Image Optimization

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL 2
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Environment Management:** dotenv
- **CORS:** cors middleware
- **Development:** Nodemon

### DevOps
- **Database Management:** MySQL
- **Container:** Docker Compose (available)
- **Version Control:** Git

## 📁 Project Structure

```
ArtyUs/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controller/
│   │   │   ├── admincontroller.js
│   │   │   ├── categorycontroller.js
│   │   │   ├── productcontroller.js
│   │   │   ├── serviceprovidercontroller.js
│   │   │   ├── tradercontroller.js
│   │   │   └── usercontroller.js
│   │   ├── middleware/
│   │   │   └── verifytoken.js     # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── adminmodel.js
│   │   │   ├── categorymodel.js
│   │   │   ├── productmodel.js
│   │   │   ├── serviceprovidermodel.js
│   │   │   ├── tradermodel.js
│   │   │   └── usermodel.js
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── serviceProviderRoutes.js
│   │   │   ├── traderRoutes.js
│   │   │   └── userRoutes.js
│   │   └── index.js               # Express server entry point
│   ├── artyus_dump.sql            # Database schema
│   ├── docker-compose.yml
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── [category]/        # Dynamic category pages
│   │   │   │   ├── [id]/          # Dynamic product detail pages
│   │   │   │   └── page.tsx
│   │   │   ├── modules/
│   │   │   │   ├── auth/          # Authentication pages
│   │   │   │   ├── dashboard/     # Role-based dashboards
│   │   │   │   ├── Home/          # Homepage components
│   │   │   │   ├── Products/      # Product pages
│   │   │   │   ├── AboutUs/
│   │   │   │   └── Blog/
│   │   │   ├── profile/           # User profile pages
│   │   │   ├── layout.tsx         # Root layout
│   │   │   └── page.tsx           # Home page
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── contexts/
│   │   │   └── UserContext.tsx    # Global user state
│   │   └── types/
│   │       └── index.ts
│   ├── public/
│   │   └── image/                 # Static images
│   ├── next.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8 or higher)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ArtyUs.git
cd ArtyUs
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE artyus;
```

2. Import the database schema:

```bash
mysql -u your_username -p artyus < backend/artyus_dump.sql
```

## 🔐 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=artyus

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
# Backend API URL
NEXT_PUBLIC_BACKEND=http://localhost:8000/api

# Cloudinary Configuration (if used in frontend)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:8000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
npm start
```

#### Start Backend

```bash
cd backend
npm start
```

## 👥 User Roles

### 1. **User**
- Browse and purchase products
- Manage personal profile
- View order history

### 2. **Trader**
- All user capabilities
- Add and manage products
- Upload product images
- Track inventory

### 3. **Service Provider**
- All user capabilities
- Offer services
- Manage service listings

### 4. **Admin**
- Full platform control
- User management
- Trader/Service Provider verification
- Product moderation
- Category management
- Platform analytics

## 📚 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signup` | User registration | No |
| POST | `/user/signin` | User login | No |
| POST | `/trader/signup` | Trader registration | No |
| POST | `/trader/signin` | Trader login | No |
| POST | `/serviceprovider/signup` | Service provider registration | No |
| POST | `/serviceprovider/signin` | Service provider login | No |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/product/getproducts` | Get all products | No |
| GET | `/product/:id` | Get single product | No |
| GET | `/product/category/:category` | Get products by category | No |
| POST | `/product/add-product` | Add new product | Yes (Trader) |
| PUT | `/product/update/:id` | Update product | Yes (Trader) |
| DELETE | `/product/delete/:id` | Delete product | Yes (Trader) |
| GET | `/product/my-products` | Get trader's products | Yes (Trader) |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users | Yes (Admin) |
| PUT | `/admin/user/:id` | Update user | Yes (Admin) |
| DELETE | `/admin/user/:id` | Delete user | Yes (Admin) |
| GET | `/admin/traders` | Get all traders | Yes (Admin) |
| PUT | `/admin/trader/:id` | Update trader | Yes (Admin) |
| DELETE | `/admin/trader/:id` | Delete trader | Yes (Admin) |
| GET | `/admin/service-providers` | Get all service providers | Yes (Admin) |
| PUT | `/admin/service-provider/:id` | Update service provider | Yes (Admin) |
| DELETE | `/admin/service-provider/:id` | Delete service provider | Yes (Admin) |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/category/getcategories` | Get all categories | No |
| POST | `/category/add-category` | Add new category | Yes (Admin) |

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **HTTP-only Cookies**: Secure cookie storage for tokens
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Role-based Access Control**: Different permission levels for different user types
- **Input Validation**: Server-side and client-side validation

## 🎨 Key Features Implementation

### Dynamic Routing
- Category-based product browsing (`/[category]`)
- Individual product pages (`/[category]/[id]`)

### Image Management
- Cloudinary integration for image uploads
- Optimized image delivery with Next.js Image component

### State Management
- React Context API for global user state
- Cookie-based session management

### Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Material-UI components for enhanced UX

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Authors

- **Krutarth** - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Express.js community
- All contributors and supporters

## 📞 Support

For support, email support@artyus.com or open an issue in the repository.

---

**Made with ❤️ by the ArtyUs Team**

