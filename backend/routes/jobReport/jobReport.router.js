import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createJobReport, deleteJobReport, getAJobReport, getAllJobsReports, getJobReportByJobId, updateJobReport } from '../../controller/jobReport.controller.js'


const router = express.Router()

router.get('/allJobReport',getAllJobsReports)
router.post('/getAJobReport',verifyUserToken,getAJobReport)
router.post('/getJobReportById',verifyUserToken,getJobReportByJobId)
router.post('/createjobReport',verifyUserToken,createJobReport)
router.put('/updateJobReport',verifyUserToken,updateJobReport)
router.delete('/deleteJobReport',verifyUserToken,deleteJobReport)

export default router