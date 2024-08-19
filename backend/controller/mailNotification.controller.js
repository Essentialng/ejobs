import { customError } from "../middlewares/errorHandler.js"
import mailModel from "../model/mail.model.js"
import nodemailer from 'nodemailer'

export const sendMail = async(req, res, next)=>{
    if(!req.body) return next(customError(400, 'Kindly provide the necessary information'))
    try {
    const {senderMail, recipientEmail, subject, content} = req.body
    //---------Send mail -------
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        const info = await transporter.sendMail({
            from: senderMail,
            to: recipientEmail,
            subject: subject,
            text: content

        })
        // -------Save to database--------
        const updatedForm = {...req.body, details: info}
        const createMail = new mailModel(updatedForm)
        const savedMail = await createMail.save()
        res.status(200).json(savedMail)
    } catch (error) {
        next(error)
    }
}

export const fetchSenderMail =async (req,res,next)=>{
    if(!req.body.userId) return next(customError(400,('Kindly provide the necessary details')))
    const userId = req.body.userId
    try {
        const mailResponse = await mailModel.find({senderId: userId})
        .populate({path: 'jobEmployer', strictPopulate: false}).exec()
        .populate({path: 'jobSeeker', strictPopulate: false}).exec()
        .populate({path: 'applicationModel', strictPopulate: false}).exec()
        res.status(200).json(mailResponse)
    } catch (error) {
        next(error)
    }
}

export const fetchRecipientMail =async (req,res,next)=>{
    if(!req.body.userId) return next(customError(400,('Kindly provide the necessary details')))
    const userId = req.body.userId
    try {
        const mailResponse = await mailModel.find({recipientId: userId})
        res.status(200).json(mailResponse)
    } catch (error) {
        next(error)
    }
}


export const fetchByApplication = async (req,res,next)=>{
    if(!req.body.applicationId) return next(customError(400,('Kindly provide the necessary details')))
    const applicationId = req.body.applicationId
    try {
        const mailResponse = await mailModel.find({applicationId: applicationId})
        res.status(200).json(mailResponse)
    } catch (error) {
        next(error)
    }
}