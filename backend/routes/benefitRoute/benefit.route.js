import express from "express"
import { verifyUserToken } from "../../middlewares/verifyToken.js"
import { createBenefit, deleteABenefit, getUserBenefit, updateBenefit } from "../../controller/benefit.controller.js"


const router = express.Router()

router.post("/getUserBenefit", verifyUserToken, getUserBenefit)
router.post("/createBenefit", verifyUserToken, createBenefit)
router.post("/updateBenefit", verifyUserToken, updateBenefit)
router.post("/deleteBenefit", verifyUserToken, deleteABenefit)

export default router