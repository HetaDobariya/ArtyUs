import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Hash password for all test users
    const hashedPasswordUser = await bcrypt.hash('Test@123', 10);
    const hashedPasswordTrader = await bcrypt.hash('Trader@123', 10);
    const hashedPasswordAdmin = await bcrypt.hash('Admin@2025', 10);

    // Regular Users (is_trader = 0)
    const regularUsers = [
      ['Krutarth Patel', 'krutarth@example.com', '123 College Road, Mumbai, Maharashtra 400001', hashedPasswordUser, '9876543210', 0, 0, 1],
      ['Amit Sharma', 'amit.sharma@example.com', '45 MG Road, Mumbai, Maharashtra 400001', hashedPasswordUser, '9876543211', 0, 0, 1],
      ['Priya Patel', 'priya.patel@example.com', '78 Gandhi Nagar, Ahmedabad, Gujarat 380001', hashedPasswordUser, '9876543212', 0, 0, 1],
      ['Rahul Kumar', 'rahul.kumar@example.com', '12 Park Street, Kolkata, West Bengal 700016', hashedPasswordUser, '9876543213', 0, 0, 0],
      ['Sneha Desai', 'sneha.desai@example.com', '56 Brigade Road, Bangalore, Karnataka 560001', hashedPasswordUser, '9876543214', 0, 0, 1],
      ['Vikram Singh', 'vikram.singh@example.com', '89 Connaught Place, New Delhi, Delhi 110001', hashedPasswordUser, '9876543215', 0, 0, 1],
      ['Anjali Reddy', 'anjali.reddy@example.com', '34 Banjara Hills, Hyderabad, Telangana 500034', hashedPasswordUser, '9876543216', 0, 0, 0],
      ['Karthik Iyer', 'karthik.iyer@example.com', '23 Anna Salai, Chennai, Tamil Nadu 600002', hashedPasswordUser, '9876543217', 0, 0, 1],
      ['Neha Gupta', 'neha.gupta@example.com', '67 Civil Lines, Jaipur, Rajasthan 302006', hashedPasswordUser, '9876543218', 0, 0, 1],
      ['Arjun Nair', 'arjun.nair@example.com', '91 Marine Drive, Kochi, Kerala 682011', hashedPasswordUser, '9876543219', 0, 0, 0],
    ];

    // Trader Users (is_trader = 1)
    const traderUsers = [
      ['Artisan Crafts Co.', 'contact@artisancrafts.com', '45 Handicraft Market, Jaipur, Rajasthan 302003', hashedPasswordTrader, '9876543220', 1, 0, 1],
      ['Creative Stationers Pvt Ltd', 'sales@creativestationers.com', '78 Industrial Area, Bangalore, Karnataka 560058', hashedPasswordTrader, '9876543221', 1, 0, 1],
      ['Heritage Art Gallery', 'info@heritageart.com', '12 Art District, Mumbai, Maharashtra 400050', hashedPasswordTrader, '9876543222', 1, 0, 0],
      ['Eco Craft Store', 'support@ecocraft.com', '56 Green Market, Pune, Maharashtra 411001', hashedPasswordTrader, '9876543223', 1, 0, 1],
      ['Gift Hampers India', 'orders@gifthampers.com', '89 Market Plaza, New Delhi, Delhi 110019', hashedPasswordTrader, '9876543224', 1, 0, 1],
    ];

    // Admin User
    const adminUser = [
      ['Admin User', 'admin@artyus.com', 'ArtyUs Headquarters, Mumbai, Maharashtra 400001', hashedPasswordAdmin, '9876543225', 0, 1, 1]
    ];

    // Insert regular users
    console.log('📝 Inserting regular users...');
    for (const user of regularUsers) {
      const sql = `
        INSERT INTO user (name, email, address, password, contact, is_trader, is_admin, is_verified, created_at, update_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE name = name
      `;
      await pool.query(sql, user);
      console.log(`   ✓ Added: ${user[0]} (${user[1]})`);
    }

    // Insert trader users
    console.log('\n🏪 Inserting trader users...');
    for (const trader of traderUsers) {
      const sql = `
        INSERT INTO user (name, email, address, password, contact, is_trader, is_admin, is_verified, created_at, update_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE name = name
      `;
      await pool.query(sql, trader);
      console.log(`   ✓ Added: ${trader[0]} (${trader[1]})`);
    }

    // Insert admin user
    console.log('\n👨‍💼 Inserting admin user...');
    for (const admin of adminUser) {
      const sql = `
        INSERT INTO user (name, email, address, password, contact, is_trader, is_admin, is_verified, created_at, update_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE name = name
      `;
      await pool.query(sql, admin);
      console.log(`   ✓ Added: ${admin[0]} (${admin[1]})`);
    }

    // Display summary
    console.log('\n📊 Database Seeding Summary:');
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Regular Users: ${regularUsers.length}`);
    console.log(`   Trader Users:  ${traderUsers.length}`);
    console.log(`   Admin Users:   ${adminUser.length}`);
    console.log(`   Total:         ${regularUsers.length + traderUsers.length + adminUser.length}`);
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    console.log('\n🔑 Test Credentials:');
    console.log('   Regular Users:  Email: krutarth@example.com, Password: Test@123');
    console.log('   Traders:        Email: contact@artisancrafts.com, Password: Trader@123');
    console.log('   Admin:          Email: admin@artyus.com, Password: Admin@2025');

    console.log('\n✅ Database seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();

