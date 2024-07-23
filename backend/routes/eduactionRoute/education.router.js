import express from 'express'
import { createUserEducation, deleteUserEducation, getUserEducation, updateUserEducation } from '../../controller/education.controller.js'
import { verifyUserToken } from '../../middlewares/verifyToken.js'

const router = express.Router()

router.post("/getUserEducation",verifyUserToken, getUserEducation)
router.post("/createUserEducation", verifyUserToken, createUserEducation)
router.put("/updateUserEducation", updateUserEducation)
router.delete("/deleteUserEducation",deleteUserEducation)

export default router