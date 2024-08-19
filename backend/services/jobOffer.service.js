import { customError, errorHandler } from "../middlewares/errorHandler.js"
import applicationModel from "../model/jobApplication.model.js"
import jobEmployerModel from "../model/jobEmployer.model.js"
import jobOfferModel from "../model/jobOffer.js"
import JobSeeker from "../model/jobSeeker.model.js"
import NotificationModel from "../model/notification.model.js"

export const createAnOffer = async(req, res, next)=>{
    const formData = req.body
    const {employer, candidate, application} = formData
    if(!employer || !candidate || !application) return next(errorHandler(401, "Kindly provide the necessary details"));
    try {
        const createJobOffer = new jobOfferModel(formData)
        const saveJobOffer = await createJobOffer.save()
        // ------update employer data------
        await jobEmployerModel.findByIdAndUpdate(
            employer,
            { $push: { jobOffers: saveJobOffer._id } },
            { new: true }
        )
        await JobSeeker.findByIdAndUpdate(
            candidate,
            { $push: { jobOffers: saveJobOffer._id } },
            { new: true }
        )
        await applicationModel.findByIdAndUpdate(
            application,
            { $push: { jobOffers: saveJobOffer._id } },
            { new: true }
        )
        res.status(200).json(saveJobOffer)
    } catch (error) {
        next(error)
    }
}


export const getAllOffers =async (req,res,next)=>{
    try {
        const allOffer = await jobOfferModel.find()
        .populate('employer')
        .populate('candidate')
        .populate('application').exec()
        res.status(200).json(allOffer)   
    } catch (error) {
        next(error)
    }
}



export const getAnOffer = async(req,res, next)=>{
    const offerId = req.body.offerId
    if(!offerId) return next(customError(401, "Kindly provide params"))
    try {
        const findOffer = await jobOfferModel.findById(offerId)
        .populate('employer')
        .populate('candidate')
        .populate('application').exec()
        if(!findOffer){
            return next(customError(400, "offer not found"))
        }
        res.status(200).json(findOffer)
    } catch (error) {
        next(error)
    }
}


export const updateOffer = (req, res)=>{
    const offerId = req.body.offerId
    if(!offerId) return next(errorHandler(401, "Job Not Found"))
    try {
        const updateOffer = jobOfferModel.findByIdAndUpdate(offerId, req.body)
        if(!updateOffer) return(next(customError(500, "unable to update")))
        res.status(200).json('Successfully update job')
    } catch (error) {
        next(error)
    }
}

export const deleteOffer = (req, res, next)=>{
    const offerId = req.body.offerId
    if(!offerId) return next(errorHandler(401, "Job Not Found"))
    try {
        const deleteOffer = jobOfferModel.findByIdAndDelete(offerId)
        if(!deleteOffer) return(res.status(500, "unable to delete"))
        res.status(200).json('Successfully delete job')
    } catch (error) {
        next(error)
    }
}