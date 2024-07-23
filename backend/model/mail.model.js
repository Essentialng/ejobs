import mongoose, { Schema } from "mongoose";

const mailSchema = new Schema({
    subject:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    senderId:{
        type:Schema.Types.ObjectId,
        ref: "jobEmployer"
    },
    recipient:{
        type:Schema.Types.ObjectId,
        ref: "jobSeeker"
    },
    applicationId:{
        type: Schema.Types.ObjectId,
        ref: "applicationModel",
        required: true
    },
},{timestamps: true})

const mailModel = mongoose.model('mailModel', mailSchema)

export default mailModel