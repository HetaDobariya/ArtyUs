import pool from './src/config/db.js';

async function checkUsers() {
    try {
        console.log('Checking user table for IDs 16 and 17...');
        const [users] = await pool.query('SELECT id, name, is_verified FROM user WHERE id IN (16, 17)');
        console.log('Users:', users);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

checkUsers();
