import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
        ref: "jobEmployer",
    },
    recipient:{
        type: Schema.Types.ObjectId,
        ref: "jobSeeker",
    },
    application:{
        type: Schema.Types.ObjectId,
        ref: "applicationModel",
    },
    message:{
        type: String,
    },
    seen:{
        type: Boolean,
        default: false
    },
},{timestamps: true})

const NotificationModel = mongoose.model("notificationModel", notificationSchema)

export default NotificationModel