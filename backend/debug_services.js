import pool from './src/config/db.js';

async function checkServices() {
    try {
        console.log('Checking database connection...');
        const connection = await pool.getConnection();
        console.log('Connected!');
        connection.release();

        console.log('Checking services table...');
        const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at DESC LIMIT 5');
        console.log(`Found ${rows.length} services.`);
        if (rows.length > 0) {
            console.log('Latest services:', rows);
        } else {
            console.log('No services found.');
        }

        console.log('Checking service_provider table...');
        const [providers] = await pool.query('SELECT * FROM service_provider LIMIT 5');
        console.log(`Found ${providers.length} service providers.`);
        console.log('Providers:', providers);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

checkServices();
