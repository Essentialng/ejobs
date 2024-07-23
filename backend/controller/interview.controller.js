import { customError } from "../middlewares/errorHandler.js"
import interviewModel from "../model/interviewModel.js"
import applicationModel from "../model/jobApplication.model.js"

export const createInterview = async(req,res,next)=>{
    const application = req.body.application
    if(!application) next(customError(400, "Application not provided"))
    try {
        const interviewData = req.body
        const response = new interviewModel(interviewData)
        const savedInterview = await response.save()
        // update application
        const updateApplication = await applicationModel.findByIdAndUpdate(application, {$push: {interviews: savedInterview._id}}, {new: true})
        res.status(201).json(savedInterview)
    } catch (error) {
        next(error)
    }
}

export const getAllInterview = async(req, res, next)=>{
    try{
        const response = await interviewModel.find()
        .populate({
            path: 'application',
            populate:[ { path: 'applicant' },
                        {path: 'companyId'}
                    ] 
        })
        .populate('status').exec()
        res.status(200).json(response)
    }catch(error){
        next(error)
    }
}

export const getInterviewByJobId = async(req,res,next)=>{
    const jobId = req.body.jobId
    if(!jobId)next(customError(400, "kindly provide all necessary details"))
    try{
        const interviewByJob = await interviewModel.find({jobId})
        .populate({path: 'jobModel', strictPopulate: false}).exec()
        res.status(200).json(interviewByJob)
    }catch(error){
        next(error)
    }
    }

export const getAnInterview = async (req,res,next)=>{
    const interviewId = req.body.interviewId
    if(!interviewId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const response = await interviewModel.findById(interviewId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
    
}

export const updateInterview = async (req,res,next)=>{
    const interviewId = req.body.interviewId
    if(!req.body || !interviewId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const updatedInterview = await interviewModel.findByIdAndUpdate(interviewId, {$set: req.body}, {new: true})
        res.status.json(updatedInterview)
    } catch (error) {
        next(error)
    }
}

export const deleteAnInterview = async (req, res, next)=>{
    const interviewId = req.body.interviewId
    if(!interviewId) next(customError(400, "Kindly Provide te necessary details"))
    try {
        const response = await interviewModel.findByIdAndDelete(interviewId)
        res.status(200).json(response)
    } catch (error) {
        
    }
}