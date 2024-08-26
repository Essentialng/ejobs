import mongoose, { Schema } from "mongoose";

const proofSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export const proofOfAddressModel = mongoose.model('proofOfAddress', proofSchema)