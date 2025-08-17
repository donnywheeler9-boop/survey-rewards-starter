// server/src/controllers/authController.js
import { pool } from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing name, email or password' })
    }

    // Check if email exists
    const existingUser = await pool.query('SELECT 1 FROM users WHERE email=$1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    // capture client IP (works behind proxy too)
    const ip =
      (req.headers['x-forwarded-for']?.toString().split(',')[0] || '').trim() ||
      req.ip

    const hashed = await bcrypt.hash(password, 10)

    // ✅ save signup IP into users.ip_address
    const result = await pool.query(
      'INSERT INTO users (name, email, password, ip_address) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
      [name, email, hashed, ip]
    )

    const user = result.rows[0]
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.json({ token, user })
  } catch (err) {
    console.error('Error during signup:', err)
    return res.status(500).json({ error: 'Signup failed' })
  }
}

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' })
    }

    const q = await pool.query('SELECT id, name, email, password FROM users WHERE email=$1', [email])
    if (!q.rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = q.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // capture client IP (works behind proxy too)
    const ip =
      (req.headers['x-forwarded-for']?.toString().split(',')[0] || '').trim() ||
      req.ip

    // save last seen IP (column: ip_address)
    try {
      await pool.query('UPDATE users SET ip_address=$1 WHERE id=$2', [ip, user.id])
    } catch (e) {
      console.warn('Could not save ip_address:', e?.message)
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Error during login:', err)
    return res.status(500).json({ error: 'Login failed' })
  }
}
