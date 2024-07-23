import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createJob, deleteJob, getAJob, getAllJobs, searchJob, updateJob } from '../../controller/job.controller.js'


const router = express.Router()

router.get('/allJob',getAllJobs)
router.post('/getAJob',verifyUserToken,getAJob)
router.post('/search',verifyUserToken,searchJob)
router.post('/createjob',verifyUserToken,createJob)
router.put('/update/:jobId',verifyUserToken,updateJob)
router.delete('/delete/:jobId',verifyUserToken,deleteJob)

export default router