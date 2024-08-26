import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    }
},{timestamps: true})

const CandidateModel = mongoose.model("candidateModel", candidateSchema)

export default CandidateModel;