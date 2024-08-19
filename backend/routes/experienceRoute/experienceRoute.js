import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createUserWork, deleteUserWork, getUserWork, updateUserWork } from '../../controller/workExperience.controller.js'

const router = express.Router()

router.post('/createExperience', verifyUserToken, createUserWork)
router.post("/getUserWork", verifyUserToken, getUserWork)
router.put('/updateUserWork', updateUserWork)
router.delete('/deleteUserWork', deleteUserWork)

export default router
