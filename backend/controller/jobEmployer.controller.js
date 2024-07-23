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


export const updateEmployer = async(req,res, next)=>{
    const jobEmployerId = req.body.jobEmployerId;
    if (!jobEmployerId) return next(customError(401, "Job Not Found"));
    try {
      const updateEmployer = await jobEmployerModel.findByIdAndUpdate(jobEmployerId, req.body, { new: true });
      if (!updateEmployer) {
        return next(customError(500, "Error updating job employer"));
      }
      res.status(200).json(updateEmployer);
    } catch (error) {
      next(error);
    }
}


export const deleteEmployer = (req,res)=>{
    const jobEmployerId = req.params.jobEmployerId
    if(!jobEmployerId) return next(errorHandler(401, "Job Not Found"))
    try {
        const deleteEmployer = jobEmployerModel.findByIdAndDelete(jobEmployerId)
        if(!deleteEmployer) return(next(500, "unable to delete"))
        res.status(200).json('Successfully delete job')
    } catch (error) {
        next(error)
    }
}

