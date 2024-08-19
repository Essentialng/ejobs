import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'admin'
    },
},{timestamps: true})

const adminModel = mongoose.model('adminModel', adminSchema)

export default adminModel