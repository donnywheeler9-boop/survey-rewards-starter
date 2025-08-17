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

// GET /api/user/profile  → name, email, ip; total surveys; current balance
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id

    // basic profile
    const userQ = await pool.query(
      'SELECT name, email, ip_address FROM users WHERE id=$1',
      [userId]
    )
    if (!userQ.rows.length) return res.status(404).json({ error: 'User not found' })
    const user = userQ.rows[0]

    // totals
    const totalQ = await pool.query(
      'SELECT COUNT(*)::int AS cnt FROM user_surveys WHERE user_id=$1',
      [userId]
    )
    const balanceQ = await pool.query(
      'SELECT points FROM users WHERE id=$1',
      [userId]
    )

    res.json({
      user,
      totalSurveys: totalQ.rows[0].cnt ?? 0,
      currentBalance: balanceQ.rows[0]?.points ?? 0,
    })
  } catch (err) {
    console.error('Error fetching profile data:', err)
    res.status(500).json({ error: 'Failed to fetch profile data' })
  }
})

export default router
