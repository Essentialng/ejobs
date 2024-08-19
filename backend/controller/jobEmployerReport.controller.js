import { customError } from "../middlewares/errorHandler.js";
import jobEmployerReportModel from "../model/jobEmployerReportSchema.js";

export const createEmployerReport = async(req, res, next)=>{
    const {employee, reporter} = formData
    if(!reporter || !employee) return next(customError(401, "Kindly provide the necessary details"));
    try {
        const createEmployerReport = new jobEmployerReportModel(formData)
        const savedReport = await createEmployerReport.save()
        
        // ------update employer data------
        await jobEmployerModel.findByIdAndUpdate(
            reporter,
            { $push: { reportMade: savedReport._id } },
            { new: true }
        )
        
        // ------update employee data------
        await JobSeeker.findByIdAndUpdate(
            employee,
            { $push: { reportGotten: savedReport._id } },
            { new: true }
        )

        res.status(200).json(savedReport)
    } catch (error) {
        next(error)
    }
}

// --------------All Reports--------------
export const getAllReport =async (req,res,next)=>{
    try {
        const allReport = await jobEmployerReportModel.find()
        .populate('reporter')
        .populate('jobSeeker').exec()
        res.status(200).json(allReport)   
    } catch (error) {
        next(error)
    }
}



export const getAReport = async(req,res, next)=>{
    const reportId = req.body.reportId
    if(!reportId) return next(customError(401, "Kindly provide params"))
    try {
        const findreport = await jobEmployerReportModel.findById(reportId)
        .populate('reporter')
        .populate('employee').exec()
        if(!findreport){
            return next(customError(400, "report not found"))
        }
        res.status(200).json(findreport)
    } catch (error) {
        next(error)
    }
}


export const updateReport = (req, res, next)=>{
    const reportId = req.body.reportId
    if(!reportId) return next(customError(401, "Job Not Found"))
    try {
        const updatereport = jobEmployerReportModel.findByIdAndUpdate(reportId, req.body)
        if(!updatereport) return(next(customError(500, "unable to update")))
        res.status(200).json('Successfully update report')
    } catch (error) {
        next(error)
    }
}

export const deleteReport = (req, res, next)=>{
    const reportId = req.body.reportId
    if(!reportId) return next(customError(401, "Job Not Found"))
    try {
        const deletedReport = jobEmployerReportModel.findByIdAndDelete(reportId)
        if(!deletedReport) return(res.status(500, "unable to delete"))
        res.status(200).json(deletedReport)
    } catch (error) {
        next(error)
    }
}