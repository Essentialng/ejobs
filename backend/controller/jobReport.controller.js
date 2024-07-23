import { customError, errorHandler } from "../middlewares/errorHandler.js"
import jobEmployerModel from "../model/jobEmployer.model.js";
import jobReportModel from "../model/jobReportSchema.js";


export const createJobReport = async(req, res, next)=>{
    const formData = req.body
    const employer = formData.employer
    if(!formData) return next(customError(401, "Kindly provide the necessary details"));
    try {
        const createJobReport = new jobReportModel(formData)
        const saveJobReport = await createJobReport.save()
        res.status(200).json(saveJobReport)
    } catch (error) {
        next(error)
    }
}


export const getAllJobsReports = async (req,res,next)=>{
    try {
        const allJobReport = await jobReportModel.find()
        .populate('applicantId')
        .populate('jobModel').exec()
        res.status(200).json(allJobReport)   
    } catch (error) {
        next(error)
    }
}
export const getJobReportByJobId = async(req,res, next)=>{
    const jobId = req.body.jobId
    try {
        const searchJobReport = await jobReportModel.find({jobId:jobId})
        .populate('applicantId')
        .populate('jobId').exec()
        res.status(200).json(searchJobReport)
    } catch (error) {
        next(error)
    }
}


export const getAJobReport = async(req,res, next)=>{
    const jobReportId = req.body.jobReportId
    if(!jobReportId) return next(customError(401, "Kindly provide params"))
    try {
        const foundJob = await jobReportModel.findById(jobReportId)
        .populate('jobSeeker')
        .populate('jobModel').exec()
        if(!foundJob){
            return next(customError(400, "job not found"))
        }
        res.status(200).json(foundJob)
    } catch (error) {
        next(error)
    }
}


export const updateJobReport = (req, res)=>{
    const jobReportId = req.params.jobReportId
    if(!jobReportId) return next(customError(401, "JobReportId Not Found"))
    try {
        const updateJobReport = jobReportModel.findByIdAndUpdate(jobReportId, req.body)
        if(!updateJobReport) return(next(customError(500, "unable to update")))
        res.status(200).json('Successfully update job')
    } catch (error) {
        next(error)
    }
}

export const deleteJobReport = (req, res)=>{
    const jobReportId = req.params.jobReportId
    if(!jobId) return next(errorHandler(401, "Job Not Found"))
    try {
        const deleteJobReport = jobReportModel.findByIdAndDelete(jobReportId)
        if(!deleteJobReport) return(res.status(500, "unable to delete"))
        res.status(200).json('Successfully delete job')
    } catch (error) {
        next(error)
    }
}