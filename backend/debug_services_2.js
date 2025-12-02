import pool from './src/config/db.js';

async function checkServices() {
    try {
        console.log('Checking service_provider table...');
        const [providers] = await pool.query('SELECT id, user_id, service_name, is_verified FROM service_provider LIMIT 5');
        console.log('Providers:', providers);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

checkServices();
