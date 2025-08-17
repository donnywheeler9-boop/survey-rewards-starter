// server/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './src/routes/auth.js'         // already in your repo
import surveyRoutes from './src/routes/surveys.js'
import userRoutes from './src/routes/user.js'
import withdrawRoutes from './src/routes/withdraw.js' // if you have it

const app = express()
app.use(cors())
app.use(express.json())

// health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// mount
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/surveys', surveyRoutes)
app.use('/api/withdraw', withdrawRoutes) // optional, if exists

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
