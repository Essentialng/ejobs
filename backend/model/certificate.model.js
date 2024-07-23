import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
        required: true
    },
    certificateName:{
        type: String,
        required: true
    },
    certificateIssuer:{
        type: String,
        required: true
    },
    issueDate:{
        type: String,
        required: true
    }
},{timestamps:true})

const certificateModel = mongoose.model('certificateModel', certificateSchema)

export default certificateModel