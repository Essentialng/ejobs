import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { deleteJobseeker, getAllJobseeker, getSingleJobseeker, updateJobseeker } from '../../controller/jobSeeker.controller.js'

const router = express.Router()

router.get('/allJobSeeker', verifyUserToken, getAllJobseeker)
router.post('/getAjobSeeker', verifyUserToken, getSingleJobseeker)
router.put('/updateJobSeeker', verifyUserToken, updateJobseeker)
router.delete('/deleteJobSeeker', verifyUserToken, deleteJobseeker)


export default router