import express from 'express';
import { createCandidate, deleteCandidate, getACandidate, getAllCandidate, updateCandidate } from '../../controller/candidate.controller.js';
const router = express.Router();

router.post('/createCandidate', createCandidate);
router.get('/getAllCandidate', getAllCandidate);
router.post('/getACandidate/:candidateId', getACandidate);
router.put('/updateCandidate/:candidateId', updateCandidate);
router.delete('/deleteCandidate/:candidateId', deleteCandidate);

export default router;