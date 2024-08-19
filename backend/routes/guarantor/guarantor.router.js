import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createUserGuarantor, deleteUserGuarantor, getGuarantor, updateUserGuarantor } from '../../controller/guarantor.controller.js'

const router = express.Router()

router.post('/createGuarantor', verifyUserToken, createUserGuarantor)
router.post("/getUserGuarantor", verifyUserToken, getGuarantor)
router.put('/updateUserGuarantor', updateUserGuarantor)
router.delete('/deleteUserGuarantor', deleteUserGuarantor)

export default router
