import mongoose, { Schema } from "mongoose";

const benefitSchema = new Schema({
    applicant:{
        type: Schema.Types.ObjectId,
        ref:"jobSeeker",
        required: true
    },
    benefitType:{
        type: String,
        required: true
    },
    benefitDescription:{
        type: String,
        required: true
    },
    amountRequested:{
        type: String,
        required: true
    },
    benefitBalance: {
        type: String,
    },
    benefitStatus: {
        type: String,
        enum:["Pending", "Approved", "rejected"],
        default: "Pending"
    }
},{timestamps: true})

const benefitModel = mongoose.model('benefitSchema', benefitSchema)

export default benefitModel