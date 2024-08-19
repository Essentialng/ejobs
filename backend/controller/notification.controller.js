import { customError } from "../middlewares/errorHandler.js"
import applicationModel from "../model/jobApplication.model.js"
import jobEmployerModel from "../model/jobEmployer.model.js"
import JobSeeker from "../model/jobSeeker.model.js"
import NotificationModel from "../model/notification.model.js"

export const getAllNotification = async(req,res,next)=>{
    try {
        const response = await NotificationModel.find()
        .populate('sender')
        .populate('recipient')
        .populate('application').exec()
        if(!response) next(customError(400,"Details not found"))
            res.status(200).json(response)
        } catch (error) {
        next(error)
    }
}


// export const getANotification = async(req,res,next)=>{
//     console.log(req.body)
//     const notificationId = req.body.notificationId
//     if(!notificationId) return next(customError(400, "Kindly provide all details"))
//     try {
//         const response = await NotificationModel.findById(notificationId)
//         .populate('sender')
//         .populate('recipient')
//         .populate('application').exec()
//         if(!response) next(customError(400,"Details not found"))
//         res.status(200).json(response)
//         } catch (error) {
//         next(error)
//     }
// }


// ------------Version 2---------
export const getANotification = async(req,res,next)=>{
    const notificationId = req.body.notificationId
    if(!notificationId) {
        return res.status(400).json({ error: "Kindly provide all details" });
    }
    try {
        const response = await NotificationModel.findById(notificationId)
            .populate('sender')
            .populate('recipient')
            .populate('application')
            .exec();
        if(!response) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getANotification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getEmployerNotification = async(req,res,next)=>{
    const userId = req.body.userId
    if(!userId) return next(customError(400, "Kindly provide all details"))
    try {
        const response = await NotificationModel.find({senderId:userId})
        .populate('sender')
        .populate('recipient')
        .populate('application').exec()
        if(!response) next(customError(400,"Details not found"))
        res.status(200).json(response)
        } catch (error) {
        next(error)
    }
} 

export const createNotification = async(req, res, next)=>{
    const {sender, recipient, application} = req.body
    if(!sender || !recipient || !application) return next(customError(400, "Kindly provide all necessary details"))
    try {
        const response = new NotificationModel(req.body)
        if(!response) next(customError(400,"Error creating notification"))
        const savedResponse = await response.save() 
    // update jobSeeker jobEmployer and application schema
            const appResponse = await applicationModel.findByIdAndUpdate(application, {$push:{notifications: savedResponse._id}}, {new: true})
            const jobResponse = await jobEmployerModel.findByIdAndUpdate(sender, {$push:{notifications: savedResponse._id}}, {new: true})   
            const seekerResponse = await JobSeeker.findByIdAndUpdate(recipient, {$push:{notifications: savedResponse._id}}, {new: true})   
        // ])
        res.status(200).json(savedResponse)
        } catch (error) {
        next(error)
    }
}