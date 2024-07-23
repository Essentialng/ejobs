import express from 'express'
import { createSeekerReport, deleteReport, getAllReport, getAReport, updateReport } from '../../controller/jobSeekerReport.controller.js'

const router = express.Router()


router.post("/getAnEmployeeReport", getAReport)
router.get("/getAllEmployeeReport", getAllReport)
router.post("/createEmplyeeReport", createSeekerReport)
router.put("/updateEmployeeReport", updateReport)
router.delete("/deleteEmployeeReport", deleteReport)


export default router