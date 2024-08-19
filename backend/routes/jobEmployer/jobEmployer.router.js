import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { deleteEmployer, getAllEmployer, getSingleEmployer, updateEmployer } from '../../controller/jobEmployer.controller.js'


const router = express.Router()

router.get('/allJobEmployer', verifyUserToken, getAllEmployer)
router.post('/jobEmployer/getJobEmployer', verifyUserToken, getSingleEmployer)
router.put('/updateJobEmployer', verifyUserToken, updateEmployer)
router.delete('/delete', verifyUserToken, deleteEmployer)

export default router