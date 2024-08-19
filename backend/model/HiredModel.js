import mongoose, { Schema } from "mongoose";

const hiredSchema = new Schema({
    jobId:{
        type: Schema.Types.ObjectId,
        ref: 'jobModel',
        required: true
    },
    applicationId:{
        type: Schema.Types.ObjectId,
        ref: 'applicationModel',
        required: true
    },
    employer:{
        type: Schema.Types.ObjectId,
        ref: 'jobEmployer'
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'jobSeeker',
        required: true
    },
    paymentHistory: {
        type: [String],
        default: []
    },
    accumulatedBenefit: {
        type: String,
    },
    offerLetter: {
        type: Schema.Types.ObjectId,
        ref: 'jobOffer'
    },
    hiredDate: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "non active"],
        default: "active"
    },
},{timestamps: true})

const hiredModel = mongoose.model('hiredModel', hiredSchema)

export default hiredModel