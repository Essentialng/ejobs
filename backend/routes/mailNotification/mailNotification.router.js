import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { fetchByApplication, fetchRecipientMail, fetchSenderMail, sendMail } from '../../controller/mailNotification.controller.js'

const router = express.Router()

router.post('/sendMail', verifyUserToken, sendMail)
router.post('/mailBySender', verifyUserToken, fetchSenderMail)
router.post('/mailByRecipient', verifyUserToken, fetchRecipientMail)
router.post('/mailByApplication', verifyUserToken, fetchByApplication)

export default router