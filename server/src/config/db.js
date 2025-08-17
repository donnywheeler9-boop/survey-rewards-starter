// server/src/config/db.js
import dotenv from 'dotenv'
dotenv.config() // <- ensure .env is loaded before reading env vars

import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL not set')
  process.exit(1)
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})
