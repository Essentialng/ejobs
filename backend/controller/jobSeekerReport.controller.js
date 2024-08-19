import { customError } from "../middlewares/errorHandler.js";
import jobEmployerModel from "../model/jobEmployer.model.js";
import JobSeeker from "../model/jobSeeker.model.js";
import jobSeekerReportModel from "../model/jobSeekerReportSchema.js";


export const createSeekerReport = async(req, res, next)=>{
    const {employer, reporter, reportContent} = req.body
    if(!reporter || !employer || !reportContent) return next(customError(401, "Kindly provide the necessary details"));
    try {
        const createSeekerReport = new jobSeekerReportModel(req.body)
        const savedReport = await createSeekerReport.save()

        // ------update Seeker data------
        await JobSeeker.findByIdAndUpdate(
            reporter,
            { $push: { reportsMade: savedReport._id } },
            { new: true }
        )
        
        // ------update employer data------
        await jobEmployerModel.findByIdAndUpdate(
            employer,
            { $push: { reportsGotten: savedReport._id } },
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
        const allReport = await jobSeekerReportModel.find()
        .populate('reporter')
        .populate('reportContent')
        .populate('employer').exec()
        res.status(200).json(allReport)   
    } catch (error) {
        next(error)
    }
}



export const getAReport = async(req,res, next)=>{
    const reportId = req.body.reportId
    if(!reportId) return next(customError(401, "Kindly provide params"))
    try {
        const findreport = await jobSeekerReportModel.findById(reportId)
        .populate('reporter')
        .populate('employer').exec()
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
        const updatereport = jobSeekerReportModel.findByIdAndUpdate(reportId, req.body)
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
        const deletedReport = jobSeekerReportModel.findByIdAndDelete(reportId)
        if(!deletedReport) return(res.status(500, "unable to delete"))
        res.status(200).json(deletedReport)
    } catch (error) {
        next(error)
    }
}