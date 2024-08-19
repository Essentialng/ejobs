import { customError, errorHandler } from "../middlewares/errorHandler.js"
import jobModel from "../model/job.model.js"
import jobEmployerModel from "../model/jobEmployer.model.js";

export const createJob = async(req, res, next)=>{
    const formData = req.body
    const employer = formData.employer
    if(!formData) return next(errorHandler(401, "Kindly provide the necessary details"));
    try {
        const createJob = new jobModel(formData)
        const saveJob = await createJob.save()
        // ------update employer data------
        await jobEmployerModel.findByIdAndUpdate(
            employer,
            { $push: { listedJobs: saveJob._id } },
            { new: true }
        )
        res.status(200).json(saveJob)
    } catch (error) {
        next(error)
    }
}


export const getAllJobs =async (req,res,next)=>{
    try {
        const allJobs = await jobModel.find()
        .populate('employer')
        .populate('numberOfApplicant')
        .populate('applications').exec()
        res.status(200).json(allJobs)   
    } catch (error) {
        next(error)
    }
}
export const searchJob = async(req,res, next)=>{
    const formData = req.body
    try {
        const searchJob = await jobModel.find(formData)
        .populate({path: 'jobEmployer', strictPopulate: false})
        .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        res.status(200).json(searchJob)
    } catch (error) {
        next(error)
    }
}


export const getAJob = async(req,res, next)=>{
    const jobId = req.body.jobId
    if(!jobId) return next(customError(401, "Kindly provide params"))
    try {
        const findJob = await jobModel.findById(jobId)
        .populate('employer')
        .populate('applications')
        .populate('numberOfApplicant').exec()
        if(!findJob){
            return next(customError(400, "job not found"))
        }
        res.status(200).json(findJob)
    } catch (error) {
        next(error)
    }
}


export const updateJob = (req, res)=>{
    const jobId = req.params.jobId
    if(!jobId) return next(errorHandler(401, "Job Not Found"))
    try {
        const updateJob = jobModel.findByIdAndUpdate(jobId, req.body)
        if(!updateJob) return(next(customError(500, "unable to update")))
        res.status(200).json('Successfully update job')
    } catch (error) {
        next(error)
    }
}

export const deleteJob = (req, res)=>{
    const jobId = req.params.jobId
    if(!jobId) return next(errorHandler(401, "Job Not Found"))
    try {
        const deleteJob = jobModel.findByIdAndDelete(jobId)
        if(!deleteJob) return(res.status(500, "unable to delete"))
        res.status(200).json('Successfully delete job')
    } catch (error) {
        next(error)
    }
}