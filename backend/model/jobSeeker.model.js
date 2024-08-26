import mongoose, { model, Schema } from 'mongoose'

const jobSeekerSchema = new Schema({
    firstName: {
        type:String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    middleName: {
        type:String,
    },

    email: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    dateOfBirth: {
        type:String,
    },
    address: {
        type:String,
        required: true
    },
    address2: {
        type:String,
    },
    dateOfBirth: {
        type:String,
    },
    race: {
        type:String,
    },
    dissability: {
        type:String,
    },
    state: {
        type:String,
        required: true
    },
    localGovernment: {
        type:String,
        required: true
    },
    country: {
        type:String,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    userType:{
        type:String,
        required: true
    },
    avatar:{
        type:String,
    },
    phoneNumber: {
        type:String,
        required: true
    },
    jobOffers:{
        type:[Schema.Types.ObjectId],
        ref: "offerModel",
    },
    appliedJobs: {
        type:[Schema.Types.ObjectId],
        ref: "applicationModel",
    },
    notifications: {
        type:[Schema.Types.ObjectId],
        ref: "notificationModel",
        default:[]
    },
    interestedJob: {
        type:[String],
    },
    jobChoice: {
        type:[String],
    },
    accountBalance: {
        type:Number,
        default: 0
    },
    education: {
        type:[Schema.Types.ObjectId],
        ref: "educationModel",
    },
    isBlacklisted: {
        type:Boolean,
        default:false
    },
    workExperience:{
        type:[Schema.Types.ObjectId],
        ref: "workModel",
    },
    certificates:{
        type:[Schema.Types.ObjectId],
        ref: "certificateModel",
    },
    guarantors:{
        type:[Schema.Types.ObjectId],
        ref: "guarantorModel",
    },
    hiredHistory:{
        type:[Schema.Types.ObjectId],
        ref: "hiredModel",
    },
    reportsMade:{
        type:[Schema.Types.ObjectId],
        ref: "jobSeekerReportModel",
    },
    reportsGotten:{
        type:[Schema.Types.ObjectId],
        ref: "jobEmployerReport",
    },
    benefits:{
        type:[Schema.Types.ObjectId],
        ref: "benefitSchema",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPaswordExpiresAt: Date,
    verifyEmailToken: String,
    verifyEmailExpiresAt: Date

},{timestamps: true})

const JobSeeker = mongoose.model('jobSeeker', jobSeekerSchema)

export default JobSeeker