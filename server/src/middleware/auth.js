// server/src/middleware/auth.js
import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [scheme, token] = header.split(' ')
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
