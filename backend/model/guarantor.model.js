import mongoose, { Schema } from "mongoose";

const guaratorSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"jobSeeker",
        required: true
    },
    guarantorName:{
        type: String,
        required: true
    },
    guarantorPhone:{
        type: String,
        required: true
    }
},{timestamps:true})

const guarantorModel = mongoose.model('guarantorModel', guaratorSchema)

export default guarantorModel