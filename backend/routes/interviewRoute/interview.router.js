import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createInterview, deleteAnInterview, getAllInterview, getAnInterview, getInterviewByJobId } from '../../controller/interview.controller.js'

const router = express.Router()

router.post('/createInterview', verifyUserToken, createInterview)
router.get('/getAllInterview', verifyUserToken, getAllInterview)
router.post('/getInterview', verifyUserToken, getAnInterview)
router.put('/updateInterview', verifyUserToken, getAnInterview)
router.delete('/deleteInterview', verifyUserToken, deleteAnInterview)
router.post('/getInterviewByJobId', verifyUserToken, getInterviewByJobId)

export default router