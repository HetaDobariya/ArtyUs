import pool from '../../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const clearDatabase = async () => {
  try {
    console.log('🧹 Starting database cleanup...\n');

    // Get count before deletion
    const [countResult] = await pool.query('SELECT COUNT(*) as count FROM user');
    const initialCount = countResult[0].count;

    console.log(`📊 Found ${initialCount} users in database`);

    // Ask for confirmation (in a real scenario, you might want to add readline for interactive confirmation)
    console.log('\n⚠️  WARNING: This will delete all test data from the user table!');
    console.log('   Only test/example users will be affected.');

    // Delete test users (excluding production data if any)
    // You can customize the WHERE clause to be more specific
    const deleteQuery = `
      DELETE FROM user 
      WHERE email LIKE '%@example.com' 
         OR email LIKE '%@artisancrafts.com'
         OR email LIKE '%@creativestationers.com'
         OR email LIKE '%@heritageart.com'
         OR email LIKE '%@ecocraft.com'
         OR email LIKE '%@gifthampers.com'
         OR email = 'admin@artyus.com'
    `;

    const [result] = await pool.query(deleteQuery);

    console.log(`\n✓ Deleted ${result.affectedRows} test users`);

    // Get count after deletion
    const [newCountResult] = await pool.query('SELECT COUNT(*) as count FROM user');
    const finalCount = newCountResult[0].count;

    console.log(`📊 Remaining users in database: ${finalCount}`);

    console.log('\n✅ Database cleanup completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error clearing database:', error);
    process.exit(1);
  }
};

// Run the cleanup function
clearDatabase();

