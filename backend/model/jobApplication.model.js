import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
    job:{
        type: Schema.Types.ObjectId,
        ref: "jobModel",
        required: true
    },
    jobOffers:{
        type:[Schema.Types.ObjectId],
        ref: "offerModel",
    },
    applicant:{
        type: [Schema.Types.ObjectId],
        ref: "jobSeeker",
        required: true
    },
    interviews:{
        type: [Schema.Types.ObjectId],
        ref: "interviewModel",
    },
    companyId:{
        type: Schema.Types.ObjectId,
        ref: "jobEmployer",
        required: true
    },
    companyAddress:{
        type: String,
        required: true
    },
    notifications:{
        type: [Schema.Types.ObjectId],
        ref: 'notificationModel',
    },
    position:{
        type: String,
        required: true
    },
    additionalDocument:{
        type: String,
    },
    coverLetter:{
        type:String,
        required: true
    },
    availability:{
        type:String,
        required: true
    },
    resume:{
        type:String,
        required: true
    },
    dateHired:{
        type:String
    },
    additionalQuestionResponse:{
        type:Array,
    },
    reasonForRejection:{
        type:String
    },
    status:{
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interviewed', 'Offer', 'Rejected', 'Accepted'],
        default: 'Applied'
    }
}, {timestamps: true})

const applicationModel = mongoose.model('applicationModel', applicationSchema)

export default applicationModel 