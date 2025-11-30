# Database Seed Data Documentation

**Project**: ArtyUs  
**Date**: November 5, 2025  
**Purpose**: Test data for development and testing

---

## Overview

This document describes the test data seeded into the ArtyUs database for testing purposes.

---

## User Table Seed Data

### Table: `user`

**Total Records**: 15 users (10 regular users + 5 traders)

### Regular Users (is_trader = 0)

#### User 1
- **Name**: Amit Sharma
- **Email**: amit.sharma@example.com
- **Password**: Test@123 (hashed)
- **Address**: 123 MG Road, Mumbai, Maharashtra 400001
- **Contact**: 9876543210
- **Role**: Regular User
- **Verified**: Yes (is_verified = 1)

#### User 2
- **Name**: Priya Patel
- **Email**: priya.patel@example.com
- **Password**: Test@123 (hashed)
- **Address**: 45 Gandhi Nagar, Ahmedabad, Gujarat 380001
- **Contact**: 9876543211
- **Role**: Regular User
- **Verified**: Yes

#### User 3
- **Name**: Rahul Kumar
- **Email**: rahul.kumar@example.com
- **Password**: Test@123 (hashed)
- **Address**: 78 Park Street, Kolkata, West Bengal 700016
- **Contact**: 9876543212
- **Role**: Regular User
- **Verified**: No (is_verified = 0)

#### User 4
- **Name**: Sneha Desai
- **Email**: sneha.desai@example.com
- **Password**: Test@123 (hashed)
- **Address**: 12 Brigade Road, Bangalore, Karnataka 560001
- **Contact**: 9876543213
- **Role**: Regular User
- **Verified**: Yes

#### User 5
- **Name**: Vikram Singh
- **Email**: vikram.singh@example.com
- **Password**: Test@123 (hashed)
- **Address**: 89 Connaught Place, New Delhi, Delhi 110001
- **Contact**: 9876543214
- **Role**: Regular User
- **Verified**: Yes

#### User 6
- **Name**: Anjali Reddy
- **Email**: anjali.reddy@example.com
- **Password**: Test@123 (hashed)
- **Address**: 34 Banjara Hills, Hyderabad, Telangana 500034
- **Contact**: 9876543215
- **Role**: Regular User
- **Verified**: No

#### User 7
- **Name**: Karthik Iyer
- **Email**: karthik.iyer@example.com
- **Password**: Test@123 (hashed)
- **Address**: 56 Anna Salai, Chennai, Tamil Nadu 600002
- **Contact**: 9876543216
- **Role**: Regular User
- **Verified**: Yes

#### User 8
- **Name**: Neha Gupta
- **Email**: neha.gupta@example.com
- **Password**: Test@123 (hashed)
- **Address**: 23 Civil Lines, Jaipur, Rajasthan 302006
- **Contact**: 9876543217
- **Role**: Regular User
- **Verified**: Yes

#### User 9
- **Name**: Arjun Nair
- **Email**: arjun.nair@example.com
- **Password**: Test@123 (hashed)
- **Address**: 67 Marine Drive, Kochi, Kerala 682011
- **Contact**: 9876543218
- **Role**: Regular User
- **Verified**: No

#### User 10
- **Name**: Pooja Mehta
- **Email**: pooja.mehta@example.com
- **Password**: Test@123 (hashed)
- **Address**: 91 FC Road, Pune, Maharashtra 411004
- **Contact**: 9876543219
- **Role**: Regular User
- **Verified**: Yes

---

### Trader Users (is_trader = 1)

#### Trader 1
- **Name**: Artisan Crafts Co.
- **Email**: contact@artisancrafts.com
- **Password**: Trader@123 (hashed)
- **Address**: 45 Handicraft Market, Jaipur, Rajasthan 302003
- **Contact**: 9876543220
- **Role**: Trader
- **Verified**: Yes
- **Business Type**: Traditional Handicrafts

#### Trader 2
- **Name**: Creative Stationers Pvt Ltd
- **Email**: sales@creativestationers.com
- **Password**: Trader@123 (hashed)
- **Address**: 78 Industrial Area, Bangalore, Karnataka 560058
- **Contact**: 9876543221
- **Role**: Trader
- **Verified**: Yes
- **Business Type**: School Supplies & Stationery

#### Trader 3
- **Name**: Heritage Art Gallery
- **Email**: info@heritageart.com
- **Password**: Trader@123 (hashed)
- **Address**: 12 Art District, Mumbai, Maharashtra 400050
- **Contact**: 9876543222
- **Role**: Trader
- **Verified**: No
- **Business Type**: Art & Paintings

#### Trader 4
- **Name**: Eco Craft Store
- **Email**: support@ecocraft.com
- **Password**: Trader@123 (hashed)
- **Address**: 56 Green Market, Pune, Maharashtra 411001
- **Contact**: 9876543223
- **Role**: Trader
- **Verified**: Yes
- **Business Type**: Eco-friendly Art Supplies

#### Trader 5
- **Name**: Gift Hampers India
- **Email**: orders@gifthampers.com
- **Password**: Trader@123 (hashed)
- **Address**: 89 Market Plaza, New Delhi, Delhi 110019
- **Contact**: 9876543224
- **Role**: Trader
- **Verified**: Yes
- **Business Type**: Gift Hampers & Customization

---

## Admin User (for future testing)

#### Admin 1
- **Name**: Admin User
- **Email**: admin@artyus.com
- **Password**: Admin@2025 (hashed)
- **Address**: ArtyUs Headquarters, Mumbai, Maharashtra 400001
- **Contact**: 9876543225
- **Role**: Administrator (is_admin = 1)
- **Verified**: Yes

---

## Password Information

All seeded passwords are hashed using bcrypt with 10 salt rounds.

**Test Passwords** (plain text for testing):
- Regular Users: `Test@123`
- Traders: `Trader@123`
- Admin: `Admin@2025`

**Hashed Password Format**: `$2b$10$...` (60 characters)

---

## Database Statistics

### User Distribution
- Total Users: 15
- Regular Users: 10 (67%)
- Traders: 5 (33%)
- Admins: 1

### Verification Status
- Verified Users: 11 (73%)
- Unverified Users: 4 (27%)

### Geographic Distribution
- Mumbai: 2
- Bangalore: 2
- Delhi: 2
- Pune: 2
- Jaipur: 2
- Ahmedabad: 1
- Kolkata: 1
- Hyderabad: 1
- Chennai: 1
- Kochi: 1

---

## SQL Seed Script

The seed data is populated using the script: `backend/src/tests/seed/seedDatabase.js`

### Running the Seed Script

```bash
cd backend
npm run seed
```

### Clearing Test Data

```bash
cd backend
npm run seed:clear
```

---

## Test Scenarios Supported

This seed data supports testing for:

1. **User Authentication**
   - Login with verified users
   - Login with unverified users
   - Login with traders
   - Login with admin

2. **Registration**
   - Duplicate email prevention
   - Email uniqueness validation

3. **User Roles**
   - Regular user capabilities
   - Trader capabilities
   - Admin capabilities

4. **Profile Updates**
   - Update address and contact
   - Verify update_at timestamp

5. **Geographic Coverage**
   - Multiple cities/states
   - Address format validation

---

## Notes

- All phone numbers follow Indian 10-digit format
- Email addresses use example.com domain for testing
- Addresses include real Indian cities and postal codes
- Created timestamps are set to script execution time
- All users have proper data normalization

---

## Maintenance

**Created**: November 5, 2025  
**Last Updated**: November 5, 2025  
**Maintained By**: Testing Team

**Version History**:
- v1.0 (2025-11-05): Initial seed data creation with 15 users

