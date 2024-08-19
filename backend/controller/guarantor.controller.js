import { customError } from "../middlewares/errorHandler.js"
import JobSeeker from "../model/jobSeeker.model.js"
import guarantorModel from "../model/guarantor.model.js"

export const getGuarantor = async(req,res, next)=>{
    const guarantorId = req.body.guarantorId
    if(!guarantorId) next(customError(400, 'Kindly provide the necessary data'))
    try {
        const userGuarantor = await guarantorModel.findById(guarantorId)
        .populate({path: 'jobSeeker', strictPopulate: false}).exec();
        res.status(200).json(userGuarantor)
    } catch (error) {
        next(error)
    }
}


export const createUserGuarantor =async (req,res, next)=>{
    const formData = req.body
    const userId = req.body.user
    if(!formData || !userId){
        return next(customError(400, "Kindly provide all necessary data"))
    }
    try {
        // ------------verify user data------------
        const userData = await JobSeeker.findById(userId)
        if(!userData) return next(customError(400, "user data not found"))
        const newGuarantor = new guarantorModel(formData)
        const savedGuarantor = await newGuarantor.save()
        // -----------update jobseeker data-------------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(userId, {$push: {guarantors : savedGuarantor._id}})
        if(!updateJobSeekerTable) return next(customError(500, "error updating jobSeeker table"))
        res.status(200).json(savedGuarantor)
    } catch (error) {
        return next(error)
    }
}


export const updateUserGuarantor =async (req,res, next)=>{
    const guarantorId = req.body.guarantorId
    if(!guarantorId) return next(customError(400, "Kindly provide the necessary details"))
    try {
        const updateGuarantor = await guarantorModel.findByIdAndUpdate(guarantorId, {$set: req.body}, {new: true})
        if(!updateGuarantor) next(customError(400, "Error updating employee data"))
        res.status(200).json(updateGuarantor)
    } catch (error) {
        next(error)
    }
}


export const deleteUserGuarantor = async(req,res, next)=>{
    const guarantorId = req.body.guarantorId
    if(!guarantorId)return next(customError(400, "kindly provide the neccessary details"))
    try {
        const deletedGuarantor = await guarantorModel.findByIdAndDelete(guarantorId)
        if(!deletedGuarantor) return next(customError(400, "Education not found"))
        // -------update jobSeeker table--------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(deletedGuarantor.user.toString(), {$pull: {guarantors: guarantorId}})
        if(!updateJobSeekerTable) return next(customError(400, "Error updating jobSeeker table"))
        res.status(200).json({message:"Education details deleted", guarantor: deletedGuarantor})
    } catch (error) {
        next(error)
    }
}

