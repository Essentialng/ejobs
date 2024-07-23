import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createSalary, deleteASalary, getASalaryByEmployee, getHiredByEmployer, updateSalary } from '../../controller/hired.controller.js'

const router = express.Router()

router.post('/createSalary', verifyUserToken, createSalary)
router.post('/getASalaryByEmployee', verifyUserToken, getASalaryByEmployee)
router.put('/updateSalary', verifyUserToken, updateSalary)
router.delete('/deleteHired', verifyUserToken, deleteASalary)
router.post('/getHiredByEmployer', verifyUserToken, getHiredByEmployer)

export default router