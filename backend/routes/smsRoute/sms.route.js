import express from 'express';
import { verifyUserToken } from '../../middlewares/verifyToken.js';
import { createSMS } from '../../controller/sms.controller.js';

const router = express.Router()

router.post("/createSMS", verifyUserToken, createSMS)

export default router