import { customError } from "../middlewares/errorHandler.js"
import benefitModel from "../model/benefitSchema.js"

export const getUserBenefit = async(req,res,next)=>{
    const userId = req.body.userId
    if(!userId) return next(customError(400, "Kindly provide all details"))
    try {
        const response = await benefitModel.find({userId:userId}).populate({path: 'jobSeeker', model: 'jobSeeker', strictPopulate: false}).exec();
        if(!response) next(customError(400,"Details not found"))
        res.status(200).json(response)
        } catch (error) {
        next(error)
    }
}


export const updateBenefit = async(req, res, next)=>{
        const benefitId = req.body.benefitId
    if(!req.body || !benefitId) next(customError(400, "Kindly provide the necessary details"))
    try {
        const updatedBenefit = await benefitModel.findByIdAndUpdate(benefitId, {$set: req.body}, {new: true})
        res.status.json(updatedBenefit)
    } catch (error) {
        next(error)
    }
}


export const createBenefit = async(req, res, next)=>{
    if(!req.body) return next(customError(400, "Kindly provide all necessary details"))
        console.log({bdy: req.body});
    try {
        const response = new benefitModel(req.body)
        if(!response) return(next(customError(400,"Error creating benefit")))
        const savedResponse = await response.save()    
        res.status(200).json(savedResponse)
        } catch (error) {
        next(error)
    }
}


export const deleteABenefit = async (req, res, next)=>{
    const benefitId = req.body.benefitId
    if(!benefitId) next(customError(400, "Kindly Provide te necessary details"))
    try {
        const response = await benefitModel.findByIdAndDelete(benefitId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}