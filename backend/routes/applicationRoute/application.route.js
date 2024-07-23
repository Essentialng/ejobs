import express from 'express'
import { createApplication, deleteApplication, getAllApplication, getAnApplication, getApplicationByJobId, getUserApplication, updateApplication } from '../../controller/application.controller.js'
import { verifyUserToken } from '../../middlewares/verifyToken.js'

const router = express.Router()

router.post("/createApplication",verifyUserToken, createApplication)
router.post("/getUserApplication", verifyUserToken, getUserApplication)
router.post("/getAnApplication", verifyUserToken, getAnApplication)
router.post("/getApplicationByJobId", verifyUserToken, getApplicationByJobId)
router.get("/allApplication", verifyUserToken, getAllApplication)
router.put('/updateApplication', verifyUserToken, updateApplication)
router.delete('/delete/:applicationId', verifyUserToken, deleteApplication)

export default router