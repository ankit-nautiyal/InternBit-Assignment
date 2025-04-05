// config/database.js
import 'dotenv/config'; // Loads environment variables
import pg from 'pg'; // Import the default export from 'pg'
const { Pool } = pg; // Destructure Pool from the pg module

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Nhost
});

pool.connect((err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to Nhost PostgreSQL');
});

export default pool;