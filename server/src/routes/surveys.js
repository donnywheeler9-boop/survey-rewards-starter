// server/src/routes/surveys.js
import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { pool } from '../config/db.js'

const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const { id: userId } = req.user
    const { rows } = await pool.query(
      `
      SELECT s.id,
             s.title,              -- ⬅️ এখন টেবিলে আছে
             s.description,
             s.points,
             (us.user_id IS NOT NULL) AS completed
      FROM surveys s
      LEFT JOIN user_surveys us
        ON us.survey_id = s.id AND us.user_id = $1
      ORDER BY s.id ASC
      `,
      [userId]
    )
    res.json(rows)
  } catch (err) {
    console.error('Error fetching surveys:', err)
    res.status(500).json({ error: 'Failed to fetch surveys' })
  }
})

router.post('/:id/complete', auth, async (req, res) => {
  const client = await pool.connect()
  try {
    const userId = req.user.id
    const surveyId = Number(req.params.id)
    if (!Number.isFinite(surveyId)) return res.status(400).json({ error: 'Invalid survey id' })

    await client.query('BEGIN')

    const done = await client.query(
      'SELECT 1 FROM user_surveys WHERE user_id=$1 AND survey_id=$2',
      [userId, surveyId]
    )
    if (done.rows.length) {
      await client.query('ROLLBACK')
      return res.status(409).json({ error: 'Survey already completed' })
    }

    const s = await client.query('SELECT points FROM surveys WHERE id=$1', [surveyId])
    if (!s.rows.length) {
      await client.query('ROLLBACK')
      return res.status(404).json({ error: 'Survey not found' })
    }
    const reward = Number(s.rows[0].points) || 0

    await client.query('UPDATE users SET points = points + $1 WHERE id=$2', [reward, userId])
    await client.query(
      'INSERT INTO user_surveys (user_id, survey_id, completed_at) VALUES ($1,$2,NOW())',
      [userId, surveyId]
    )

    const nb = await client.query('SELECT points FROM users WHERE id=$1', [userId])

    await client.query('COMMIT')
    res.json({ message: 'Survey completed', reward, newBalance: nb.rows[0].points })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error completing survey:', err)
    res.status(500).json({ error: 'Failed to complete survey' })
  } finally {
    client.release()
  }
})

export default router
