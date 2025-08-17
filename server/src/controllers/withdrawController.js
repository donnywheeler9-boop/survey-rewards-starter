// server/src/controllers/withdrawController.js
import { pool } from '../config/db.js'

export async function withdraw(req, res, next) {
  const client = await pool.connect()
  try {
    const userId = req.user?.id
    const { amount } = req.body
    const amt = Number(amount)

    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    if (!Number.isFinite(amt) || amt <= 0) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    await client.query('BEGIN')

    const bal = await client.query('SELECT points FROM users WHERE id=$1 FOR UPDATE', [userId])
    if (!bal.rows.length) {
      await client.query('ROLLBACK')
      return res.status(404).json({ error: 'User not found' })
    }

    const current = bal.rows[0].points
    if (current < amt) {
      await client.query('ROLLBACK')
      return res.status(400).json({ error: 'Insufficient points' })
    }

    const newBalance = current - amt
    await client.query('UPDATE users SET points=$1 WHERE id=$2', [newBalance, userId])
    await client.query(
      'INSERT INTO withdraw_requests(user_id, amount, status) VALUES($1,$2,$3)',
      [userId, amt, 'pending']
    )

    await client.query('COMMIT')
    return res.json({ message: 'Withdraw request submitted', newBalance })
  } catch (err) {
    await client.query('ROLLBACK')
    return next(err)
  } finally {
    client.release()
  }
}

export async function getPoints(req, res, next) {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { rows } = await pool.query('SELECT points FROM users WHERE id=$1', [userId])
    if (!rows.length) return res.status(404).json({ error: 'User not found' })

    return res.json({ points: rows[0].points })
  } catch (err) {
    return next(err)
  }
}
