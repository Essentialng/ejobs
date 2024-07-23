import { customError } from "../middlewares/errorHandler.js"
import jobEmployerModel from "../model/jobEmployer.model.js"

export const getAllEmployer = async (req, res, next)=>{
    try {
        const allEmployer = await jobEmployerModel.find()
        res.status(200).json(allEmployer)
    } catch (error) {
        next(error)
    }
}

export const getSingleEmployer = (req,res,next)=>{
    const employerId = req.body.employerId
    if(!employerId) return next(customError("Kindly Provide all necessary details"))
    try {
        const jobEmployerDetails = jobEmployerModel.findById(employerId)
        .populate({path: 'contact', strictPopulate: false}).exec()
        .populate({path: 'jobModel', strictPopulate: false}).exec()
        .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        .populate({path: 'notificationModel', strictPopulate: false}).exec()
        res.status(200).json(jobEmployerDetails)
    } catch (error) {
        next(error)
    }
}


export const updateEmployer = (req,res)=>{
    return res.status(200).json("This ia a single user route")
}


export const deleteEmployer = (req,res)=>{
    return res.status(200).json("This ia a single user route")
}

