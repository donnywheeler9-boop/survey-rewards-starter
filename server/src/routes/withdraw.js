import { Router } from 'express'
import { withdraw, getPoints } from '../controllers/withdrawController.js'
import { auth } from '../middleware/auth.js'

const router = Router()
router.get('/user/points', auth, getPoints)
router.post('/', auth, withdraw)
export default router
