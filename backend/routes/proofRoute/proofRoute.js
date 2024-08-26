import express from 'express'
import multer from 'multer'
import { createProof, deleteProof, getProof, updateProof } from '../../controller/proofController.js'
import { storage } from '../../utils/upload.js'

const router = express.Router()
const upload = multer({
    storage: storage,
    limits: {fieldSize: 10 * 1024 * 1024}
})

router.post("/createProof", upload.single('image'), createProof)
router.get('/getProof/:proofId', getProof)
router.put('/updateProof/:proofId', updateProof)
router.delete('/deleteProof/:proofId', deleteProof)

export default router