import mongoose, {Schema} from 'mongoose'

const jobOfferSchema = new Schema({
    employer: {
        type: Schema.Types.ObjectId,
        ref: "jobEmployer",
        required: true
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'jobSeeker',
        required: true
    },
    application: {
        type: Schema.Types.ObjectId,
        ref: 'jobModel',
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    resumptionDate: {
        type: String,
        required: true
    },
    resumptionTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
},{timestamps: true})

const jobOfferModel = mongoose.model('offerModel', jobOfferSchema)

export default jobOfferModel