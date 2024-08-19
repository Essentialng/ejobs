import mongoose, {Schema} from 'mongoose'

const jobSeekerReportSchema = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
    },
    employer:{
        type: Schema.Types.ObjectId,
        ref: "jobEmployer"
    },
    reportContent: {
        type: String,
    }
},{timestamps: true})

const jobSeekerReportModel = mongoose.model('jobSeekerReportModel', jobSeekerReportSchema)

export default jobSeekerReportModel