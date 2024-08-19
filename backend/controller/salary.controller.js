import { customError } from "../middlewares/errorHandler.js"
import salaryModel from "../model/salarySchema.js"

export const createSalary = async(req,res,next)=>{
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

export const getAllSalary = async(req, res, next)=>{
    try {
        const allSalary = await salaryModel.find()
        res.status(200).json(allSalary)
    } catch (error) {
        next(error)
    }
}

export const getSalaryByEmployerId = async(req,res,next)=>{
    const jobId = req.body.jobId
    if(!jobId)next(customError(400, "kindly provide all necessary details"))
        try{
    const hireByJob = await hireModel.find({hireId})
    .populate({path: 'jobEmployer', strictPopulate: false}).exec()
    .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        res.status(200).json(hireByJob)
    }catch(error){
        next(error)
    }
}

export const getASalary = async (req,res,next)=>{
    const salaryId = req.body.salaryId
    if(!salaryId) next(customError(400, "Kindly provide the necessary details"))
        try {
    const response = await salaryModel.findById(salaryId)
    .populate({path: 'jobEmployer', strictPopulate: false}).exec()
    .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
    
}

export const updateSalary = async (req,res,next)=>{
    const salaryId = req.body.salaryId
    if(!req.body || !salaryId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const updatedSalary = await salaryModel.findByIdAndUpdate(salaryId, {$set: req.body}, {new: true})
        res.status.json(updatedSalary)
    } catch (error) {
        next(error)
    }
}

export const deleteASalary = async (req, res, next)=>{
    const salaryId = req.body.salaryId
    if(!salaryId) next(customError(400, "Kindly Provide te necessary details"))
    try {
        const response = await salaryModel.findByIdAndDelete(salaryId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}