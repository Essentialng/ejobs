import mongoose, {Schema} from 'mongoose'

const jobSchema = new Schema({
    employer: {
        type: Schema.Types.ObjectId,
        ref: "jobEmployer",
        required: true,
    },
    applications: {
        type: [Schema.Types.ObjectId],
        ref: "applicationModel",
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    paymentRefrence: {
        type: String,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobFunction: {
        type: String,
        required: true,
    },
    industry:{
        type:String,
        required: true
    },
    localGovernment: {
        type: String,
        required: true,
    },
    minimumQualification: {
        type: String,
        required: true
    },
    workType: {
        type: String,
        required: true
    },
    experienceLength: {
        type: String,
        required: true
    },
    jobLevel: {
        type: String,
    },
    currency: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    vacancyDuration:{
        type: String,
        required: true
    },
    numberOfOpenings: {
        type: String,
        required: true
    },
    jobDescription: {
        type: [String],
    },
    jobSummary: {
        type: String,
        required: true
    },
    interviewQuestionResponse: {
        type: [String]
    },
    additionalInterviewQuestion: {
        type: [String]
    },
    jobTag: {
        type: [String]
    },
    jobSkills: {
        type: [String]
    },
    requireCoverLetter: {
        type: Boolean,
        default: true
    },
    requiredocumentUpload: {
        type: Boolean,
        default: true
    },
    isValidated: {
        type: Boolean,
        default: false
    },
    jobDuration:{
        type:String
    },
    isStarred:{
        type:Boolean,
        default: false
    },
    numberOfApplicant:{
        type:[Schema.Types.ObjectId],
        ref: "jobSeeker"
    },
    reports:{
        type:[Schema.Types.ObjectId],
        ref: "jobReportModel"
    }

},{timestamps:true})

const jobModel = mongoose.model("jobModel", jobSchema)
export default jobModel