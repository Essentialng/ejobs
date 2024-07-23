import { customError } from "../middlewares/errorHandler.js"
import JobSeeker from "../model/jobSeeker.model.js";


export const getAllJobseeker = async(req, res, next)=>{
    try {
        const allJobseekers = await JobSeeker.find()
        .populate('appliedJobs')
        .populate('notifications')
        .populate('education')
        .populate('workExperience')
        .populate('certificates')
        .populate('guarantors')
        .populate('hiredHistory')
        .populate('benefits').exec()
        res.status(200).json(allJobseekers)   
    } catch (error) {
        next(error)
    }
}

export const getSingleJobseeker =async (req,res, next)=>{
    const jobSeekerId = req.body.jobSeekerId
    if(!jobSeekerId) return next(customError(401, "Kindly provide params"))
    try {
        const findJobSeeker = await JobSeeker.findById(jobSeekerId)
        .populate('appliedJobs')
        .populate('notifications')
        .populate('education')
        .populate('workExperience')
        .populate('certificates')
        .populate('guarantors')
        .populate('hiredHistory')
        .populate('benefits').exec()
        if(!findJobSeeker){
            return res.status(401).json("job seeker not found")
        }
        res.status(200).json(findJobSeeker)
    } catch (error) {
        next(error)
    }
}

  
  // Route handler for updating job seeker with file upload
  export const updateJobseeker = async (req, res, next) => {
    const jobSeekerId = req.body.jobSeekerId;
    const { jobSeekerId: seekerId, ...others } = req.body;
    if (!jobSeekerId) return next(customError(401, "Job Not Found"));
  
    try {
      const updateSeeker = await JobSeeker.findByIdAndUpdate(jobSeekerId, others, { new: true });
      if (!updateSeeker) {
        return next(customError(500, "Error updating job seeker"));
      }
      
      res.status(200).json(updateSeeker);
    } catch (error) {
      next(error);
    }
  };
// -------handling file upload------------

export const deleteJobseeker = (req,res)=>{
    const jobSeekerId = req.params.jobSeekerId
    if(!jobSeekerId) return next(errorHandler(401, "Job Not Found"))
    try {
        const deleteSeeker = JobSeeker.findByIdAndDelete(jobSeekerId)
        if(!deleteJobseeker) return(next(500, "unable to delete"))
        res.status(200).json('Successfully delete job')
    } catch (error) {
        next(error)
    }
}

