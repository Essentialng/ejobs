import mongoose, { Schema } from "mongoose";

const workSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
    },
    companyName:{
        type: String,
        required: true
    },
    companyAddress:{
        type: String,
        required: true
    },
    positionHeld:{
        type: String,
        required: true
    },
    contactPerson:{
        type: String,
        required: true
    },
    contactPhone:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    reports:{
        type: [String],
    },
    startYear:{
        type: String,
        required: true
    },
    finishYear:{
        type: String,
        required: true
    },
    jobDescription:{
        type: String,
        required: true
    }
},{timestamps:true})

const workModel = mongoose.model('workModel', workSchema)

export default workModel