// server/src/routes/profile.js

import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { pool } from '../config/db.js'

const router = Router()

// GET /api/profile  → fetch user profile information
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id

    // Fetch user profile details
    const userResult = await pool.query('SELECT name, email, ip_address FROM users WHERE id=$1', [userId])

    if (!userResult.rows.length) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = userResult.rows[0]

    // Fetch the user's survey completions and balance
    const totalSurveysResult = await pool.query('SELECT COUNT(*) FROM user_surveys WHERE user_id=$1', [userId])
    const currentBalanceResult = await pool.query('SELECT points FROM users WHERE id=$1', [userId])

    res.json({
      user,
      totalSurveys: totalSurveysResult.rows[0].count,
      currentBalance: currentBalanceResult.rows[0].points,
    })
  } catch (err) {
    console.error('Error fetching profile:', err)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

export default router
