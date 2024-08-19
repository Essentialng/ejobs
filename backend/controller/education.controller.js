import { customError } from "../middlewares/errorHandler.js"
import educationModel from "../model/education.model.js"
import JobSeeker from "../model/jobSeeker.model.js"

export const getUserEducation =async (req,res, next)=>{
    const educationId = req.body.educationId
    if(!educationId) next(customError(400, 'Kindly provide the necessary data'))
        try {
    const userEducation =await educationModel.findById(educationId)
    .populate({path: 'jobSeeker', strictPopulate: false}).exec();
    if(!userEducation) return next(customError(400, "data not found"))
        res.status(200).json(userEducation)
    } catch (error) {
        next(error)
    }
}


export const createUserEducation =async (req,res, next)=>{
    const formData = req.body
    const userId = req.body.user
    if(!formData || !userId){
        return next(customError(400, "Kindly provide all necessary data"))
    }
    try {
        // ------------verify user data------------
        const userData = await JobSeeker.findById(userId)
        if(!userData) return next(customError(400, "user data not found"))
            const newEducation = new educationModel(formData)
        const savedEducation = await newEducation.save()
        // -----------update jobseeker data-------------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(userId, {$push: {education : savedEducation._id}})
        if(!updateJobSeekerTable) return next(customError(500, "error updating jobSeeker table"))
        res.status(200).json(savedEducation)
    } catch (error) {
        return next(error)
    }
}


export const updateUserEducation =async (req,res, next)=>{
    const educationId = req.body.educationId
    if(!educationId) return next(customError(400, "Kindly provide the necessary details"))
        try {
        const updateEducation = await educationModel.findByIdAndUpdate(educationId, {$set: req.body}, {new: true})
        if(!updateEducation) next(customError(400, "Error updating employee data"))
        res.status(200).json(updateEducation)
    } catch (error) {
        next(error)
    }
}


export const deleteUserEducation = async(req,res, next)=>{
    const educationId = req.body.educationId
    if(!educationId)return next(customError(400, "kindly provide the neccessary details"))
    try {
        const deletedEducation = await educationModel.findByIdAndDelete(educationId)
    // -------update jobSeeker table--------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(deletedEducation.user.toString(), {$pull: {education: educationId}})
        if(!deletedEducation) return next(customError(400, "Education not found"))
        if(!updateJobSeekerTable) return next(customError(400, "Error updating jobSeeker table"))
        res.status(200).json(deletedEducation)
    } catch (error) {
        next(error)
    }
}

