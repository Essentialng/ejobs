import express from 'express'
import { createUserCertificate, deleteUserCertificate, getUserCertificate, updateUserCertificate } from '../../controller/certificate.controller.js'

const router = express.Router()

router.post("/getUserCertificate", getUserCertificate)
router.post("/createUserCertificate", createUserCertificate)
router.put("/updateUserCertificate", updateUserCertificate)
router.delete("/deleteUserCertificate", deleteUserCertificate)


export default router