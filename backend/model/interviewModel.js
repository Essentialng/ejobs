import mongoose, { Schema } from "mongoose";

const interviewSchema = new Schema({
    application:{
        type: Schema.Types.ObjectId,
        ref: "applicationModel",
        required: true
    },
    typeOfInterview: {
        type: String,
        required: true
    },
    interviewLocation: {
        type: String,
    },
    interviewDate: {
        type: String,
        required: true
    },
    interviewTime: {
        type: String,
        required: true
    },
    additionalInformation: {
        type: String,
        required: true
    },
    InterviewResponse: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "done", "missed"],
        default: "pending"
    },
},{timestamps: true})

const interviewModel = mongoose.model('interviewModel', interviewSchema)

export default interviewModel