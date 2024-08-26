import { customError } from "../middlewares/errorHandler.js";
import contactModel from "../model/contactPerson.model.js";
import jobEmployerModel from "../model/jobEmployer.model.js";

// Get details of a contact person
export const getDetails = async (req, res, next) => {
  try {
    const employerId = req.body.contactId;
    if (!employerId) return next(customError(400, "Kindly provide the necessary data"));
    const employerData = await contactModel.findById(employerId)
    .populate({path: 'jobSeeker', strictPopulate: false}).exec();
    if (!employerData) return next(customError(404, "User Not Found"));
    res.status(200).json(employerData);
  } catch (error) {
    next(error);
  }
};

// Create a new contact person
export const createContactPerson = async (req, res, next) => {
  const employerData = req.body;
  const { company, firstName, lastName, email, phoneNumber, gender } = employerData;
  if (!company || !firstName || !lastName || !email || !phoneNumber || !gender) {
    return next(customError(400, "Kindly provide all details"));
  }
  try {
    const createContact = new contactModel(employerData);
    const saveContact = await createContact.save();
    // ---------update company profile------
    await jobEmployerModel.findByIdAndUpdate(company, {
      contactPerson: saveContact._id
    })
    res.status(200).json(saveContact);
  } catch (error) {
    console.log(error)
    next(error);
  }
};


// Update contact person details
export const updateContactPerson = async (req, res, next) => {
  const contactId = req.body.contactId;
  console.log({first: req.body})
  if (!contactId) return next(customError(401, "Employee Not Found"));
  try {
    const updatedContact = await contactModel.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!updatedContact) return next(customError(404, "User Not Found"));
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error)
    next(error);
  }
};


// Delete a contact person
export const deleteContactPerson = async (req, res, next) => {
  const employerId = req.params.employerId;

  if (!employerId) return next(customError(401, "Employee Not Found"));

  try {
    const deletedContact = await contactModel.findByIdAndDelete(employerId);
    if (!deletedContact) return next(customError(404, "User Not Found"));

    res.status(200).json('Successfully deleted employee contact');
  } catch (error) {
    next(error);
  }
};
