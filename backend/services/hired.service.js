import { customError } from "../middlewares/errorHandler.js"
import hiredModel from "../model/HiredModel.js"

export const createHired = async(req,res,next)=>{
    if(!req.body) next(customError(400, "kindly provide all necessary details"))
    try {
        const hiredData = req.body
        const response = new hiredModel(hiredData)
        const savedHire = await response.save()
        res.status(201).json(savedHire)
    } catch (error) {
        next(error)
    }
}

export const getHiredByEmployerId = async(req,res,next)=>{
    const jobId = req.body.jobId
    if(!jobId)next(customError(400, "kindly provide all necessary details"))
    try{
        const hireByJob = await hiredModel.find({hireId})
        .populate({path: 'jobModel', strictPopulate: false}).exec()
        .populate({path: 'applicationModel', strictPopulate: false}).exec()
        .populate({path: 'jobEmployer', strictPopulate: false}).exec()
        .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        res.status(200).json(hireByJob)
    }catch(error){
        next(error)
    }
    }

export const getAHired = async (req,res,next)=>{
    const hireId = req.body.hireId
    if(!interviewId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const response = await hiredModel.findById(hireId)
        .populate({path: 'jobModel', strictPopulate: false}).exec()
        .populate({path: 'applicationModel', strictPopulate: false}).exec()
        .populate({path: 'jobEmployer', strictPopulate: false}).exec()
        .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
    
}

export const updateHired = async (req,res,next)=>{
    const hireId = req.body.hireId
    if(!req.body || !hireId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const updatedHire = await hireModel.findByIdAndUpdate(interviewId, {$set: req.body}, {new: true})
        res.status.json(updatedHire)
    } catch (error) {
        next(error)
    }
}

export const deleteAHired = async (req, res, next)=>{
    const hireId = req.body.hireId
    if(!hireId) next(customError(400, "Kindly Provide te necessary details"))
    try {
        const response = await hiredModel.findByIdAndDelete(hireId)
        res.status(200).json(response)
    } catch (error) {
        
    }
}