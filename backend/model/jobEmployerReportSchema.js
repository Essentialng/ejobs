import mongoose, {Schema} from 'mongoose'

const employerReportSchema = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "jobEmployer",
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref: "jobSeeker"
    },
    reportContent: {
        type: String,
    }
},{timestamps: true})

const jobEmployerReportModel = mongoose.model('jobEmployerReport', employerReportSchema)

export default jobEmployerReportModel