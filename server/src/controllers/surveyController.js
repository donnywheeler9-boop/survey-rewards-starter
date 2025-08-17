import { pool } from '../config/db.js'

// GET /api/surveys (protected)
export async function listSurveys(req, res) {
  try {
    // auth আছে বলেই ধরে নিচ্ছি; তবু টাইপ সেফটি
    const userId = Number(req.user?.id) || -1

    const { rows } = await pool.query(
      `
      SELECT
        s.id,
        s.title,
        s.description,
        s.reward AS points,
        s.is_active,
        EXISTS (
          SELECT 1
          FROM user_surveys us
          WHERE us.survey_id = s.id
            AND us.user_id = COALESCE($1::int, -1)
        ) AS completed
      FROM surveys s
      WHERE s.is_active = TRUE
      ORDER BY s.id ASC
      `,
      [userId]
    )

    return res.json(rows)
  } catch (err) {
    console.error('Error in listSurveys:', err)  // << server log দেখুন
    return res.status(500).json({ error: 'Failed to fetch surveys' })
  }
}

// POST /api/surveys/:id/complete (same as before)
export async function completeSurvey(req, res, next) {
  const client = await pool.connect()
  try {
    const userId = Number(req.user?.id) || -1
    const surveyId = Number(req.params.id)
    if (userId < 0) return res.status(401).json({ error: 'Unauthorized' })
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

    const s = await client.query(
      'SELECT reward FROM surveys WHERE id=$1 AND is_active=TRUE',
      [surveyId]
    )
    if (!s.rows.length) {
      await client.query('ROLLBACK')
      return res.status(404).json({ error: 'Survey not found' })
    }
    const reward = Number(s.rows[0].reward) || 0

    await client.query('UPDATE users SET points = points + $1 WHERE id=$2', [reward, userId])
    await client.query('INSERT INTO user_surveys (user_id, survey_id) VALUES ($1,$2)', [userId, surveyId])

    const nb = await client.query('SELECT points FROM users WHERE id=$1', [userId])

    await client.query('COMMIT')
    return res.json({ message: 'Survey completed', reward, newBalance: nb.rows[0].points })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error in completeSurvey:', err)
    return res.status(500).json({ error: 'Failed to complete survey' })
  } finally {
    client.release()
  }
}
