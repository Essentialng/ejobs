import { customError, errorHandler } from "../middlewares/errorHandler.js"
import jobModel from "../model/job.model.js"
import applicationModel from "../model/jobApplication.model.js"
import JobSeeker from "../model/jobSeeker.model.js"


export const createApplication = async(req,res,next)=>{
    const {applicant, job, availability} = req.body

    if(!applicant || !job || !availability ){
        next(customError(400, "Kindly fill the necessary fields"))
    }
    const applicantDetails = await JobSeeker.findById(applicant)
    if(!applicantDetails) return next(customError(400, "user profile not found"))
    try {
        const createApplication = new applicationModel(req.body)
        const savedApplication = await createApplication.save()
    // -----------update user profile---------------
    const updateJobSeeker = await JobSeeker.findByIdAndUpdate(applicant, {$push:{appliedJobs: savedApplication._id}})
    if(!updateJobSeeker) return (next(customError('Unable to update user')))
    // -----------update job profile---------------
    const updateJobPostApplicant = await jobModel.findByIdAndUpdate(job, {$push:{numberOfApplicant: applicant}})
    const updateJobPostApplications = await jobModel.findByIdAndUpdate(job, {$push:{applications: savedApplication._id}})
    if(!updateJobPostApplicant || !updateJobPostApplications) return(next(customError('Unable to update job model')))
    res.status(200).json(savedApplication)
    } catch (error) {
        next(error)
    }
}

export const getUserApplication = async(req,res, next)=>{
    const applicantId = req.body.applicantId
    if(!applicantId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const fetchedApplication = await applicationModel.find({ applicant: applicantId }).populate({path: 'jobModel', model:['jobModel', 'jobSeeker'], strictPopulate: false}).exec();
            if (!fetchedApplication) {
                return next(customError(404, "No application found for the provided job ID"));
            }
            res.status(200).json(fetchedApplication);
    } catch (error) {
        next(error)
    }
}

export const getAnApplication = async(req,res, next)=>{
    const applicantionId = req.body.applicantionId
    if(!applicantionId) next(customError(400, "Kindly provide the necessary details"))
        try {
    const fetchedApplication = await applicationModel.findById(applicantionId)
        .populate('applicant')
        .populate('interviews')
        .populate('companyId')
        .populate('job')
        .exec();
        if(!fetchedApplication) next(customError(404, "No application found for the provided applicant ID"));
        res.status(200).json(fetchedApplication)
        } catch (error) {
            next(error)
        }
}


export const getApplicationByJobId = async(req,res, next)=>{
    const {jobId} = req.body
    if(!jobId) next(customError(400, "Kindly provide the necessary details"))
        try {
            const fetchedApplication = await applicationModel.find({ job: jobId }).populate('job')
            .populate('applicant')
            .populate('interviews')
            .populate('companyId')
            .exec();
            if (!fetchedApplication) {
                return next(customError(404, "No application found for the provided job ID"));
            }
            res.status(200).json(fetchedApplication);
        } catch (error) {
            next(error)
        }
}


export const getAllApplication = async(req, res, next)=>{
    try {
        const fetchedApplication = await applicationModel.find()
        .populate('applicant')
        .populate('interviews')
        .populate('companyId')
        .exec();
        res.status(200).json(fetchedApplication)
    } catch (error) {
        next(error)
    }
}
export const updateApplication = async(req,res,next)=>{
    const applicationId = req.body.applicationId
    const formData = req.body
    console.log({first: applicationId})
    if(!applicationId) next(customError(400, "Kindly provide all necessary data"))
    try {
        const updateStatus = await applicationModel.findByIdAndUpdate(applicationId, {
            $set: formData}, {new: true})
        res.status(200).json(updateStatus)
    } catch (error) {
        next(error)
    }
}


export const deleteApplication = async(req,res,next)=>{
    const applicationId = req.params.applicationId
    if(!applicationId) next(400, "Kindly provide the necessary details")
    try {
        await applicationModel.findByIdAndDelete(applicationId)
        res.status(200).json("Application deleted successfully")
    } catch (error) {
        next(error)
    }
}