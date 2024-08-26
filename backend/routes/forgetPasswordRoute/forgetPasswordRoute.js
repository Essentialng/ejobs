import express from "express";
import { forgetPassword, resetPassword } from "../../controller/forgetPassword.controller.js";

const router = express.Router()

router.post('/changePassword', forgetPassword)      //---request to forget password
router.post('/changePasswordResponse', resetPassword)      //----response with new password.

export default router