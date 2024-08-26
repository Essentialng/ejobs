import express from 'express'
import multer from 'multer'
import { storage } from '../../utils/upload.js'
import { createAddressProof, deleteAddressProof, getAddressProof, updateAddressProof } from '../../controller/addressProof.js'

const router = express.Router()
const upload = multer({
    storage: storage,
    limits: {fieldSize: 10 * 1024 * 1024}
})

router.post("/createAddressProof", upload.single('image'), createAddressProof)
router.get('/getAddressProof/:proofId', getAddressProof)
router.put('/updateAddressProof/:proofId', updateAddressProof)
router.delete('/deleteAddressProof/:proofId', deleteAddressProof)

export default router