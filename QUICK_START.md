# 🚀 Quick Start Guide - ArtyUs

Get ArtyUs up and running in 5 minutes!

## Prerequisites

- Node.js v18+ installed
- MySQL v8+ installed and running
- Git installed

## Step-by-Step Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/ArtyUs.git
cd ArtyUs

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup (1 minute)

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE artyus;"

# Import schema
mysql -u root -p artyus < backend/artyus_dump.sql
```

### 3. Environment Configuration (1 minute)

#### Backend - Create `backend/.env`

```env
PORT=8000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=artyus
JWT_SECRET=my_super_secret_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

#### Frontend - Create `frontend/.env.local`

```env
NEXT_PUBLIC_BACKEND=http://localhost:8000/api
```

### 4. Start the Application (1 minute)

#### Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

✅ Backend running on http://localhost:8000

#### Terminal 2 - Start Frontend

```bash
cd frontend
npm run dev
```

✅ Frontend running on http://localhost:3000

## 🎉 You're Ready!

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api

## 🧪 Test the Setup

1. **Check Backend**: Visit http://localhost:8000/api/category/getcategories
   - Should return JSON data

2. **Check Frontend**: Visit http://localhost:3000
   - Should see the ArtyUs homepage

## 📝 Default Test Accounts

After importing the database, you may need to create accounts through the signup pages:

- **User Signup**: http://localhost:3000/modules/auth/SignUp
- **Trader Signup**: http://localhost:3000/modules/auth/TraderSignUp
- **Service Provider Signup**: http://localhost:3000/modules/auth/ServiceProviderSignup

## 🐛 Common Issues & Fixes

### Database Connection Failed

```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL if not running
sudo systemctl start mysql
```

### Port Already in Use

```bash
# Backend (Port 8000)
lsof -ti:8000 | xargs kill -9

# Frontend (Port 3000)
lsof -ti:3000 | xargs kill -9
```

### Cannot Find Module Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Can't Reach Backend

1. Check backend is running on port 8000
2. Verify `NEXT_PUBLIC_BACKEND` in `frontend/.env.local`
3. Check CORS settings in `backend/src/index.js`

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) if you want to contribute
- Explore the API endpoints
- Start building features!

## 🆘 Need Help?

- Check the [README.md](./README.md) for full documentation
- Review existing [GitHub Issues](https://github.com/yourusername/ArtyUs/issues)
- Create a new issue if you're stuck

---

**Happy Hacking! 🎨**


