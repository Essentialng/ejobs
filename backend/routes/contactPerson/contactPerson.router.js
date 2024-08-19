import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createContactPerson, deleteContactPerson, getDetails, updateContactPerson } from '../../controller/contactPerson.controller.js'

const router = express.Router()

router.post("/getDetails", verifyUserToken, getDetails)
router.post("/createContact", verifyUserToken, createContactPerson)
router.put("/updateContact", verifyUserToken, updateContactPerson)
router.delete("/deleteContact", verifyUserToken, deleteContactPerson)

export default router