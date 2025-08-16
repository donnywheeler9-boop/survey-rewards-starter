import { Pool } from 'pg';  // Import the Pool constructor from the pg module

// Fetch the DATABASE_URL from environment variables
const connectionString = process.env.DATABASE_URL;

// Check if DATABASE_URL is not set
if (!connectionString) {
  console.error('DATABASE_URL not set');
  process.exit(1); // Exit the process if the DATABASE_URL is not found
}

// Create a new instance of Pool with the connection string and SSL configuration
export const pool = new Pool({
  connectionString,       // Connection URL from environment
  ssl: {                   // SSL connection settings for secure communication
    rejectUnauthorized: false,  // Allows self-signed certificates for Neon DB
  },
});

// Test Database Connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);  // Log error if connection fails
  } else {
    console.log('Connected to the database:', res.rows[0]);  // Log success message with current time
  }
});
