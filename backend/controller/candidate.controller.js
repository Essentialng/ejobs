import { customError } from "../middlewares/errorHandler.js";
import CandidateModel from "../model/candidate.model.js";

export const createCandidate = async (req, res, next) => {
    const { name, qualification, position, phoneNumber, email} = req.body;
    if(!name && !qualification && !position && !phoneNumber && !email ){
        return next(customError(400, "Kindly provide the necessary data"));
    }

    try {
        const newCandidate = new CandidateModel({ name, qualification, position, phoneNumber, email});
        const savedCandidate = await newCandidate.save();
        res.status(201).json(savedCandidate);
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const getAllCandidate = async (req, res, next) => {
    try {
        const candidates = await CandidateModel.find();
        if(!candidates){
            next(customError(404, "No candidates found"));
        }
        res.status(200).json(candidates);
    } catch (error) {
        next(error)
    }
}


export const getACandidate = async(req, res, next)=>{
    const candidateId = req.params.candidateId
    if(!candidateId){
        return next(customError(400, "Kindly provide the necessary details"))
    }
    try {
        const fetchedCandidate = await CandidateModel.findById(candidateId);
        if(!fetchedCandidate){
            return next(customError(404, "No candidate found for the provided ID"));
        }
        res.status(200).json(fetchedCandidate);
    } catch (error) {
        next(error)
    }
}


export const updateCandidate = async(req, res, next) =>{
    const candidateId = req.params.candidateId
    console.log(candidateId, req.body);
    if(!candidateId || !req.body){
        return next(customError(400, "Kindly provide the necessary data"));
    }
    try {
        const updatedCandidate = await CandidateModel.findByIdAndUpdate(candidateId, req.body, { new: true });
        if(!updatedCandidate){
            return next(customError(404, "No candidate found for the provided ID"));
        }
        res.status(200).json(updatedCandidate);
    } catch (error) {
        next(error)
    }
}


export const deleteCandidate = async(req, res, next)=>{
    const candidateId = req.params.candidateId
    if(!candidateId){
        return next(customError(400, "Kindly provide the necessary details"))
    }
    try {
        const deletedCandidate = await CandidateModel.findByIdAndDelete(candidateId);
        if(!deletedCandidate){
            return next(customError(404, "No candidate found for the provided ID"));
        }
        res.status(200).json(deletedCandidate);
    } catch (error) {
        next(error)
    }
}