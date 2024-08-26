import mongoose, { Schema } from 'mongoose'

const jobEmployerSchema = new Schema({
    companyName:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
    },
    contactPerson:{
        type:Schema.Types.ObjectId,
        ref:"contact"
    },
    password:{
        type:String,
        required:true,
    },
    size:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    localGovernment:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    proofOfCompany:{
        type:[Schema.Types.ObjectId],
        ref: "proofOfCompany"
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    employerType:{
        type:String,
    },
    userType:{
        type:String,
        required: true
    },
    listedJobs:{
        type:[Schema.Types.ObjectId],
        ref:"jobModel",
    },
    certificate:{
        type:String,
    },
    employers:{
        type:[Schema.Types.ObjectId],
        ref:"jobSeeker",
    },
    reportsMade:{
        type:[Schema.Types.ObjectId],
        ref: "jobEmployerReport",
    },
    jobOffers:{
        type:[Schema.Types.ObjectId],
        ref: "offerModel",
    },
    reportsGotten:{
        type:[Schema.Types.ObjectId],
        ref: "jobSeekerReportModel",
    },
    notifications:{
        type:[Schema.Types.ObjectId],
        ref:"notificationModel",
    },
    isBlacklisted:{
        type:Boolean,
        default: false
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPaswordExpiresAt: Date,
    verifyEmailToken: String,
    verifyEmailExpiresAt: Date
},{timestamps: true})

const jobEmployerModel = mongoose.model('jobEmployer', jobEmployerSchema)

export default jobEmployerModel