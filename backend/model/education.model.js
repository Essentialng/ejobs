import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
        required: true
    },
    school:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    startYear:{
        type: String,
        required: true
    },
    finishYear:{
        type: String,
        required: true
    },
    certificate:{
        type: String,
        required: true
    }
},{timestamps:true})

const educationModel = mongoose.model('educationModel', educationSchema)

export default educationModel