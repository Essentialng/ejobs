import express from 'express'
import { createEmployerReport, deleteReport, getAllReport, getAReport, updateReport } from '../../controller/jobEmployerReport.controller.js'

const router = express.Router()

router.post("/getAnEmployerReport", getAReport)
router.get("/getAllEmployerReport", getAllReport)
router.post("/createEmplyeeReport", createEmployerReport)
router.put("/updateemployerReport", updateReport)
router.delete("/deleteemployerReport", deleteReport)


export default router