import express from 'express'
import { signinUser, signoutUser, signupUser } from '../../controller/auth.controller.js'

const router = express()

router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.post('/signout', signoutUser)

export default router