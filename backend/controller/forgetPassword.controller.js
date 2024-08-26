import bcrypt from "bcryptjs"
import { customError } from "../middlewares/errorHandler.js"
import jobEmployerModel from "../model/jobEmployer.model.js"
import JobSeeker from "../model/jobSeeker.model.js"
import { forgetPasswordEmail } from "../services/EmailService/emailVerification.js"
import { generateTokenAndCookie, verifyEmailToken } from "../utils/generateVerificationToken.js"


export const forgetPassword = async (req, res, next)=>{
    const {email} = req.body
    if(!email) return next(customError(400, "Kindly provide all necessary data"))
    
    // -------confirm email exist in db---------
    const user = await jobEmployerModel.find({email: email}) || await JobSeeker.fin({email: email})
    if(!user) return next(customError(400, "User not found"))
    
    //--------Email logic here------------
    const token = generateTokenAndCookie(res,user._id)
    try{
        forgetPasswordEmail(email, `${process.env.FORGET_PASSWORD}${token}/${user.userType}`)
        res.status(201).json('verification sent')
    }catch(error){
        next(error)
    }
}


export const resetPassword = async (req, res, next)=>{
    const {userType, newPassword, token} = req.body

    const checkToken = verifyEmailToken(token)
    if(!checkToken.isValid) return customError(401, 'Invalid or expired token')
    
    const salt = Number(process.env.SALT) || 10
    const saltRounds = bcrypt.genSaltSync(salt)
    const hashedPassword = bcrypt.hashSync(newPassword,saltRounds)
    try {
        if(userType === 'jobSeeker'){
            const response = await JobSeeker.findByIdAndUpdate(userId, hashedPassword)
        }else{
            const response = await jobEmployerModel.findByIdAndUpdate(userId, hashedPassword)
        }
        res.status(200).json('Password updated successfully')
    } catch (error) {
        next(error)
    }
}