import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createHired, deleteAHired, getAHired, getHiredByEmployerId, updateHired } from '../../controller/hired.controller.js'

const router = express.Router()

router.post('/createHired', verifyUserToken, createHired)
router.post('/getHired', verifyUserToken, getAHired)
router.put('/updateHired', verifyUserToken, updateHired)
router.delete('/deleteHired', verifyUserToken, deleteAHired)
router.post('/getHiredByJobId', verifyUserToken, getHiredByEmployerId)

export default router