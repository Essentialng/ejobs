import express from "express"
import { verifyUserToken } from "../../middlewares/verifyToken.js"
import { createNotification, getAllNotification, getANotification, getEmployerNotification } from "../../controller/notification.controller.js"

const router = express.Router()
router.get("/getAllNotification", verifyUserToken, getAllNotification)
router.post("/getANotification", verifyUserToken, getANotification)
router.post("/getEmployerNotification", verifyUserToken, getEmployerNotification)
router.post("/createNotification", verifyUserToken, createNotification)


export default router