import { customError } from "../middlewares/errorHandler.js";
import jobEmployerModel from "../model/jobEmployer.model.js";
import { proofOfCompanyModel } from "../model/proofSchema.js";
import path from 'path';
import { promises as fsPromises, existsSync, unlink } from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProof = async (req, res, next) => {
    const { companyId, title, description } = req.body;
    if (!companyId || !title || !description) next(customError(400, 'Kindly provide all field'));

    try {
        const createProof = new proofOfCompanyModel({
            companyId: companyId, title: title, description: description, image: req.file.filename 
        });
        const savedProof = await createProof.save();
        // ----------update owner proof record----------
        await jobEmployerModel.findByIdAndUpdate(companyId, { $push: { proofOfCompany: savedProof._id } }, { new: true });
        res.status(200).json(savedProof);
    } catch (error) {
        next(error);
    }
};

export const getProof = async (req, res, next) => {
    const proofId = req.params.proofId;
    if (!proofId) next(customError(400, 'Kindly provide proofID'));
    try {
        const getProof = await proofOfCompanyModel.findById(proofId)
            .populate('companyId').exec();
        res.status(200).json(getProof);
    } catch (error) {
        next(error);
    }
};

export const updateProof = async (req, res, next) => {
    const proofId = req.params.proofId;
    if (!proofId || !req.body) next(customError(400, 'Kindly provide the necessary details'));
    try {
        const updateProof = await proofOfCompanyModel.findByIdAndUpdate(proofId, req.body, { new: true });
        res.status(200).json(updateProof);
    } catch (error) {
        next(error);
    }
};

export const deleteProof = async (req, res, next) => {
    const proofId = req.params.proofId;
    if (!proofId) next(customError(400, 'Kindly provide the necessary details'));
    try {
        const proof = await proofOfCompanyModel.findById(proofId);
        if (!proof) {
            return next(customError(404, 'Proof not found'));
        }

        // Get the filename from the proof document
        const filename = proof.image;

        const deletedProof = await proofOfCompanyModel.findByIdAndDelete(proofId);
        if (deletedProof) {
            const filePath = path.join('./public', filename);
            // Check if file exists before trying to delete
            if (existsSync(filePath)) {
                unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        // You might want to log this error, but not necessarily return it to the client
                    }
                });
            }
        }
        res.status(200).json(deletedProof);
    } catch (error) {
        console.log({ first: error });
        next(error);
    }
};
