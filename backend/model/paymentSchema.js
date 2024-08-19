import mongoose, { Schema } from "mongoose";

const salarySchema = new Schema({
    refNumber:{
        type: String,
        required: true
    },
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "jobEmployer",
    },
    recipientId:{
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
    },
    jobId:{
        type: Schema.Types.ObjectId,
    },
    status: {
        type: String,
        default: 'Pending'
    },
    percentageOff: {
        type: Number,
    },
    paymentType: {
        type: String,
        enum: ["Benefit", "Salary"],
        required: true
    }
},{timestamps: true})

const salaryModel = mongoose.model('salaryModel', salarySchema)

export default salaryModel