import { Router } from 'express'
import { listSurveys, completeSurvey } from '../controllers/surveyController.js'
import { auth } from '../middleware/auth.js'

const router = Router()
router.get('/', auth, listSurveys)
router.post('/:id/complete', auth, completeSurvey)
export default router
