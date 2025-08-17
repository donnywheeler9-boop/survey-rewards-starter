// server/src/routes/user.js
import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { pool } from '../config/db.js'

const router = Router()

// GET /api/user/points
router.get('/points', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT points FROM users WHERE id=$1', [req.user.id])
    if (!rows.length) return res.status(404).json({ error: 'User not found' })
    res.json({ points: rows[0].points })
  } catch (err) {
    console.error('Error fetching points:', err)
    res.status(500).json({ error: 'Failed to fetch points' })
  }
})

export default router
