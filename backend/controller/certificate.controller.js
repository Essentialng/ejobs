import { customError } from "../middlewares/errorHandler.js"
import JobSeeker from "../model/jobSeeker.model.js"
import certificateModel from "../model/certificate.model.js"


export const getUserCertificate = async(req,res, next)=>{
    const certificateId = req.body.certificateId
    if(!certificateId) next(customError(400, 'Kindly provide the necessary data'))
    try {
        const userCertificate = await certificateModel.findById(certificateId)
        .populate({path: 'jobSeeker', strictPopulate: false}).exec();
        res.status(200).json(userCertificate)
    } catch (error) {
        next(error)
    }
}


export const createUserCertificate =async (req,res, next)=>{
    const formData = req.body
    const userId = req.body.user
    if(!userId){
        return next(customError(400, "Kindly provide all necessary data"))
    }
    try {
        // ------------verify user data------------
        const userData = await JobSeeker.findById(userId)
        if(!userData) return next(customError(400, "user data not found"))
        const newCertificate = new certificateModel(formData)
        const savedCertificate = await newCertificate.save()
        // -----------update jobseeker data-------------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(userId, {$push: {certificates : savedCertificate._id}})
        if(!updateJobSeekerTable) return next(customError(500, "error updating jobSeeker table"))
        res.status(200).json(savedCertificate)
    } catch (error) {
        return next(error)
    }
}


export const updateUserCertificate =async (req,res, next)=>{
    const certificateId = req.body.certificateId
    if(!certificateId) return next(customError(400, "Kindly provide the necessary details"))
    try {
        const updateCertificate = await certificateModel.findByIdAndUpdate(certificateId, {$set: req.body}, {new: true})
        if(!updateCertificate) next(customError(400, "Error updating employee data"))
        res.status(200).json(updateCertificate)
    } catch (error) {
        next(error)
    }
}


export const deleteUserCertificate = async(req,res, next)=>{
    const certificateId = req.body.certificateId
    if(!certificateId)return next(customError(400, "kindly provide the neccessary details"))
    try {
        const deletedCertificate = await certificateModel.findByIdAndDelete(certificateId)
        if(!deletedCertificate) return next(customError(400, "Education not found"))
        // -------update jobSeeker table--------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(deletedCertificate.user, {$pull: {certificates: certificateId}})
        if(!updateJobSeekerTable) return next(customError(400, "Error updating jobSeeker table"))
        res.status(200).json({message:"Education details deleted", certificateDeleted: deletedCertificate})
    } catch (error) {
        next(error)
    }
}

