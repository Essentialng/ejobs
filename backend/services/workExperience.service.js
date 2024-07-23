import { customError } from "../middlewares/errorHandler.js"
import JobSeeker from "../model/jobSeeker.model.js"
import workModel from "../model/work.model.js"

export const getUserWork = async(req,res, next)=>{
    const workId = req.body.workId
    if(!workId) next(customError(400, 'Kindly provide the necessary data'))
    try {
        const userWork = await workModel.findById(workId)
        .populate({path: 'jobEmployer', strictPopulate: false}).exec()
        .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        res.status(200).json(userWork)
    } catch (error) {
        next(error)
    }
}


export const createUserWork =async (req,res, next)=>{
    const formData = req.body
    const userId = req.body.user
    if(!userId){
        return next(customError(400, "Kindly provide all necessary data"))
    }
    try {
        // ------------verify user data------------
        const userData = await JobSeeker.findById(userId)
        if(!userData) return next(customError(400, "user data not found"))
        const newWork = new workModel(formData)
        const savedWork = await newWork.save()
        // -----------update jobseeker data-------------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(userId, {$push: {workExperience : savedWork._id}})
        if(!updateJobSeekerTable) return next(customError(500, "error updating jobSeeker table"))
        res.status(200).json(savedWork)
    } catch (error) {
        return next(error)
    }
}


export const updateUserWork =async (req,res, next)=>{
    const workId = req.body.workId
    if(!workId) return next(customError(400, "Kindly provide the necessary details"))
    try {
        const updateWork = await workModel.findByIdAndUpdate(workId, {$set: req.body}, {new: true})
        if(!updateWork) next(customError(400, "Error updating employee data"))
        res.status(200).json(updateWork)
    } catch (error) {
        next(error)
    }
}


export const deleteUserWork = async(req,res, next)=>{
    const workId = req.body.workId
    if(!workId)return next(customError(400, "kindly provide the workId"))
    try {
        const deletedWork = await workModel.findByIdAndDelete(workId)
        // -------update jobSeeker table--------
        const updateJobSeekerTable = await JobSeeker.findByIdAndUpdate(deletedWork.user.toString(), {$pull: {workExperience: workId}})
        if(!deletedWork) return next(customError(400, "Education not found"))
        if(!updateJobSeekerTable) return next(customError(400, "Error updating jobSeeker table"))
        res.status(200).json({message:"Education details deleted", workExperience: deletedWork})
    } catch (error) {
        next(error)
    }
}

