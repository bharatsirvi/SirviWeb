import Professional from "../models/professionalModel.js";
import Gotra from "../models/gotraModel.js";
import { throwError } from "../util/error.js";

const getAllProfessionals = async (req, res, next) => {
  const { name, gender, department, location, gotra } = req.query;
  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `.*${name}.*`, $options: "i" };
    }
    if (gender) {
      filterQuery.gender = gender;
    }
    if (department) {
      filterQuery.department = { $regex: `.*${department}.*`, $options: "i" };
    }
    if (location) {
      filterQuery.location = { $regex: `.*${location}.*`, $options: "i" };
    }
    if (gotra) {
      const professionalGotra = await Gotra.find({
        name: { $regex: new RegExp(gotra, "i") },
      });
      console.log(professionalGotra);
      if (professionalGotra.length===0) {
        return res.status(404).json({ error: "No Professional found" });
      }
      filterQuery.gotra_id = professionalGotra[0]._id;
    }
    const professionals = await Professional.find(filterQuery);
    if (professionals.length === 0) {
      return res.status(404).json({ error: "No Professional found" });
    }
    res.status(201).json(professionals);
  } catch (error) {
    throwError(next,error);
  }
};

const getProfessionalById = async(req, res,next) => {
    try {
        const professional = await Professional.findById(req.params.id);
        if (!professional) {
            return res.status(404).json({ error: "Professional not found" });
        }
        res.status(201).json(professional);
    }
    catch (error){
        throwError(next,error);

    }
};

const createProfessional = async(req, res,next) => {
    try {
        const professional = new Professional(req.body);
        await professional.save();
        res.status(201).json(professional);
    }
    catch (error){
        throwError(next,error);

    }
};

const updateProfessional = async(req, res,next) => {
    try {
        const professionalId = req.params.id;
        const professionalExists = await Professional.findById(professionalId);
    
        if (!professionalExists) {
            return res.status(404).json({ error: "Professional not found" });
        }
    
        const updatedProfessional = await Professional.findByIdAndUpdate(professionalId, req.body, {
            new: true,
        });
    
        res.status(200).json(updatedProfessional);
    } catch (error) {
        throwError(next,error);
    }
    
};

const deleteProfessional = async(req, res,next) => 
    {
        try {
            const professionalId = req.params.id;
            const professionalExists = await Professional.findById(professionalId);
            if (!professionalExists) {
                return res.status(404).json({ error: "Professional not found" });
            }
            await Professional.findByIdAndDelete(professionalId);
            res.status(200).json({ message: "Professional deleted successfully" });
        } catch (error) {
            throwError(next,error);
        }
};

export default {
  getAllProfessionals,
  getProfessionalById,
  createProfessional,
  updateProfessional,
  deleteProfessional,
};
