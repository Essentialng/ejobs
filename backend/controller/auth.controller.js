import { customError, errorHandler } from "../middlewares/errorHandler.js"
import bcrypt from 'bcryptjs'
import JobSeeker from "../model/jobSeeker.model.js"
import jobEmployerModel from "../model/jobEmployer.model.js"
import jwt from 'jsonwebtoken'
import adminModel from "../model/adminSchema.js"
import { generateTokenAndCookie, generateVerificationCode } from "../utils/generateVerificationToken.js"
import { sendVerificationEmail } from "../services/EmailService/emailVerification.js"


export const signupUser = async(req,res, next)=>{
    const formData = req.body
    const {userType, country, email, password} = formData
    
    // ------check for fields----------
    if(
        !userType ||
        !country ||
        !email ||
        !password 
    ) return next(customError(403, "All fields are required for backend"))
    

    // ------check for duplicate----------
    if(userType === 'jobSeeker'){
        const userAlreadyExist = await JobSeeker.findOne({email: email})
        if(userAlreadyExist) return next(customError(403, 'Email already exist'))
    }else if(userType === 'jobEmployer'){
        const userAlreadyExist = await jobEmployerModel.findOne({email: email})
        if(userAlreadyExist) return next(customError(403, 'Email already exist'))
    }else if(userType === 'admin'){
        const userAlreadyExist = await adminModel.findOne({email: email})
        if(userAlreadyExist) return next(customError(403, 'Email already exist'))
    }


    const salt = Number(process.env.SALT) || 10
    const saltRounds = bcrypt.genSaltSync(salt)
    const hashedPassword = bcrypt.hashSync(password,saltRounds)
    
    // --------generate verification token--------
    const verificationCode = generateVerificationCode()
    const userData = {
        ...formData, 
        password : hashedPassword, 
        verifyEmailToken: verificationCode,
        verifyEmailExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24hrs
    }


    const typeOfUser = userData.userType
    try {

        // --------save user data to database------
        let newUser
        if(typeOfUser === "jobSeeker"){
            newUser = new JobSeeker(userData)
        }else if(typeOfUser === 'jobEmployer'){
            newUser = new jobEmployerModel(userData)
        }else if(typeOfUser === 'admin'){
            newUser = new adminModel(userData)
        }
        await newUser.save()
        
        // ------verify email-------
        await sendVerificationEmail(email,verificationCode)

        // ------generate token and cookie user
        const jwtSecret = process.env.secret || "weAreEssential"
        const token = jwt.sign({userId: newUser._doc._id}, jwtSecret, {expiresIn:"24h"})
        res.status(200)
        .cookie('access_token', token, {
            httpOnly: true,
            signed: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,    // 24hrs
            sameSite: 'lax'
        }).json({
            success: true,
            message: 'User registered successfully',
            user: {...newUser._doc, password: undefined}
        })


    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const signinUser = async(req,res, next)=>{
    const {email, password, userType} = req.body
    if(
        !email ||
        !password ||
        !userType ||
        email === '' ||
        password === '' ||
        userType === ''
    ) return next(customError(400, "All fields are required"))
    
    // -----------search user-------------
    let isValidUser
    switch (userType) {
        case 'jobSeeker':
            try {
                isValidUser = await JobSeeker.findOne({email})
                .populate({path:'appliedJobs',
                    populate: {
                        path: 'companyId',
                    }}
                )
                .populate('notifications')
                .populate('education')
                .populate('workExperience')
                .populate('certificates')
                .populate('guarantors')
                .populate('hiredHistory')
                .populate('reportsMade')
                .populate('reportsGotten')
                .populate('benefits').exec()
            } catch (error) {
                next(error)
            }
            break;
            case 'jobEmployer':
            try {
                isValidUser = await jobEmployerModel.findOne({email})
                .populate('contactPerson')
                .populate('employers')
                .populate('reportsMade')
                .populate('reportsGotten')
                .populate('proofOfCompany')
                .populate({path: 'listedJobs', model: 'jobModel'}).exec()
            } catch (error) {
                next(error)
            }
            break;
            case 'admin':
            try {
                isValidUser = await adminModel.findOne({email})
            } catch (error) {
                next(error)
            }
            break;
            default:
                break;
            }
            
            if(isValidUser === null) return next(customError(400, "Invalid email or password"))
                // -------check for password-------
            const isValidPassword = bcrypt.compareSync(password, isValidUser.password)
            if(!isValidPassword) return next(customError(400, "invalid username or password"))
            
            
            // ------generate a token--------
            const jwtSecret = process.env.secret || "weAreEssential"
            
            const userId = isValidUser._id.toString()
            
            const token = jwt.sign({userId: userId}, jwtSecret, {expiresIn:"24h"})
            const {password: userPassword, ...otherDetails} = isValidUser._doc
            res.status(200)
            .cookie('access_token', token, {
                httpOnly: true,
                signed: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'lax'
            }).json(otherDetails)
        }
        
        export const signoutUser = (req, res)=>{
            res.clearCookie('access_token');
            res.status(200).json({ message: 'Logged out successfully' });
        }
        