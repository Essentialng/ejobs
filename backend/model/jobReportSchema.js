import mongoose, {Schema} from 'mongoose'

const jobReportSchema = new Schema({
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "jobModel",
        required: true
    },
    reportDetails: {
        type: String,
        required: true
    }
},{timestamps: true})

const jobReportModel = mongoose.model('jobReportModel', jobReportSchema)

export default jobReportModel