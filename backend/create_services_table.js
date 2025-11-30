import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createServicesTable = async () => {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to database');

    // Read SQL file
    const sqlFile = path.join(__dirname, 'create_services_table.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Execute SQL
    console.log('📝 Creating services table...');
    await connection.query(sql);
    
    console.log('✅ Services table created successfully!');
    console.log('\n📋 Table structure:');
    console.log('   - id (AUTO_INCREMENT PRIMARY KEY)');
    console.log('   - service_provider_id (FK to service_provider)');
    console.log('   - name (VARCHAR 255)');
    console.log('   - description (TEXT)');
    console.log('   - price (DECIMAL 10,2)');
    console.log('   - image_url (VARCHAR 500)');
    console.log('   - created_at (TIMESTAMP)');
    console.log('   - updated_at (TIMESTAMP)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating services table:', error.message);
    if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('ℹ️  Table already exists. No action needed.');
    } else {
      console.error('Full error:', error);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

createServicesTable();

