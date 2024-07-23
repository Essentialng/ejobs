import { customError, errorHandler } from "../middlewares/errorHandler.js"
import bcrypt from 'bcryptjs'
import JobSeeker from "../model/jobSeeker.model.js"
import jobEmployerModel from "../model/jobEmployer.model.js"
import jwt from 'jsonwebtoken'
import adminModel from "../model/adminSchema.js"


export const signupUser = async(req,res, next)=>{
    const formData = req.body
    const {userType, country, email, password} = formData
    if(
        !userType ||
        !country ||
        !email ||
        !password 
    ) return next(customError(403, "All fields are required for backend"))
    const salt = Number(process.env.SALT) || 10
    const saltRounds = bcrypt.genSaltSync(salt)
    const hashedPassword = bcrypt.hashSync(password,saltRounds)
    const userData = {...formData, password : hashedPassword}
    const typeOfUser = userData.userType
    try {
        let newUser
        if(typeOfUser === "jobSeeker"){
            newUser = new JobSeeker(userData)
        }else{
            newUser = new jobEmployerModel(userData)
        }
        await newUser.save()
        res.status(200).json('User registered successfully')
    } catch (error) {
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
            
        }
        