import mongoose, { Schema } from 'mongoose'

const contactSchema = new Schema({
    company:{
                type: Schema.Types.ObjectId,
                ref:"jobEmployer",
                unique: true,
                required: true
            },
            firstName:{
                type:String,
                required: true
            },
            lastName:{
                type:String,
                required: true
            },
            email:{
                type:String,
                unique: true,
                required: true
            },
            phoneNumber:{
                type:String,
                required: true
            },
            position:{
                type:String,
                required: true
            },
            gender:{
                type:String,
                required: true
            },
},{timestamps:true})

const contactModel = mongoose.model('contact', contactSchema)

export default contactModel