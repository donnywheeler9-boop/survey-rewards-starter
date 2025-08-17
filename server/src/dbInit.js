// server/src/dbInit.js
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { pool } from './config/db.js'   // ✅ named import

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function run() {
  try {
    // schema/seed files under server/src/db
    const schemaPath = path.join(__dirname, 'db', 'schema.sql')
    const seedPath = path.join(__dirname, 'db', 'seed.sql')

    const schema = fs.readFileSync(schemaPath, 'utf8')
    console.log('Applying schema...')
    await pool.query(schema)
    console.log('Schema applied.')

    if (fs.existsSync(seedPath)) {
      const seed = fs.readFileSync(seedPath, 'utf8')
      console.log('Seeding data...')
      await pool.query(seed)
      console.log('Seed complete.')
    } else {
      console.log('No seed.sql found; skipping seed.')
    }
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
