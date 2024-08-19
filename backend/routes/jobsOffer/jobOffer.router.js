import express from 'express'
import { verifyUserToken } from '../../middlewares/verifyToken.js'
import { createAnOffer, deleteOffer, getAllOffers, getAnOffer, updateOffer } from '../../controller/jobOffer.controller.js'


const router = express.Router()

router.get('/allOffer',verifyUserToken,getAllOffers)
router.post('/getAnOffer',verifyUserToken,getAnOffer)
router.post('/createOffer',verifyUserToken,createAnOffer)
router.put('/updateOffer',verifyUserToken,updateOffer)
router.delete('/deleteOffer',verifyUserToken,deleteOffer)

export default router