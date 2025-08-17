import { pool } from '../config/db.js'

// GET /api/surveys  (protected)
// return active surveys + { points, completed }
export async function listSurveys(req, res, next) {
  try {
    const userId = req.user?.id
    const { rows } = await pool.query(
      `
      SELECT s.id,
             s.title,
             s.description,
             s.reward AS points,
             s.is_active,
             CASE WHEN us.user_id IS NULL THEN FALSE ELSE TRUE END AS completed
      FROM surveys s
      LEFT JOIN user_surveys us
        ON us.survey_id = s.id AND us.user_id = $1
      WHERE s.is_active = TRUE
      ORDER BY s.id ASC
      `,
      [userId]
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

// POST /api/surveys/:id/complete  (protected)
export async function completeSurvey(req, res, next) {
  const client = await pool.connect()
  try {
    const userId = req.user?.id
    const surveyId = Number(req.params.id)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    if (!Number.isFinite(surveyId)) return res.status(400).json({ error: 'Invalid survey id' })

    await client.query('BEGIN')

    // Already completed?
    const done = await client.query(
      'SELECT 1 FROM user_surveys WHERE user_id=$1 AND survey_id=$2',
      [userId, surveyId]
    )
    if (done.rows.length) {
      await client.query('ROLLBACK')
      return res.status(409).json({ error: 'Survey already completed' })
    }

    // Get reward
    const s = await client.query('SELECT reward FROM surveys WHERE id=$1 AND is_active=TRUE', [surveyId])
    if (!s.rows.length) {
      await client.query('ROLLBACK')
      return res.status(404).json({ error: 'Survey not found' })
    }
    const reward = Number(s.rows[0].reward) || 0

    // Credit points + mark completion
    await client.query('UPDATE users SET points = points + $1 WHERE id=$2', [reward, userId])
    await client.query(
      'INSERT INTO user_surveys (user_id, survey_id) VALUES ($1, $2)',
      [userId, surveyId]
    )

    // New balance
    const nb = await client.query('SELECT points FROM users WHERE id=$1', [userId])

    await client.query('COMMIT')
    res.json({ message: 'Survey completed', reward, newBalance: nb.rows[0].points })
  } catch (err) {
    await client.query('ROLLBACK')
    next(err)
  } finally {
    client.release()
  }
}
