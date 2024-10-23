import Contribution from '../models/contributionModel.js';
import { throwError } from '../util/error.js';

const getAllContributions = async(req, res,next) => {
    const { contributor, desc, month,year, amount, type } = req.query;
    const filterQuery = {};
    try {
        if (contributor) {
            filterQuery.contributors = { $regex: `.*${contributor}.*`, $options: "i" };
        }
        if (amount) {
            filterQuery.amount = { $gte: amount };
        }
        if (type) {
            filterQuery.type = { $regex: `.*${type}.*`, $options: "i" };
        }
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            filterQuery.date= {
              $gte: startDate,
              $lte: endDate,
            };
          } else if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31);
            filterQuery.date = {
              $gte: startDate,
              $lte: endDate,
            };
          }
        const contributions = await Contribution.find(filterQuery);
        if (contributions.length === 0) {
            return res.status(404).json({ error: "No Contribution found" });
        }
        res.status(201).json(contributions);
    }
    catch (error){
        throwError(next,error);
    }
};

const getContributionById = async(req, res,next) => {
    try {
        const contribution = await Contribution.findById(req.params.id);
        if (!contribution) {
            return res.status(404).json({ error: "Contribution not found" });
        }
        res.status(201).json(contribution);
    }
    catch (error){
        throwError(next,error);
    }
};

const createContribution = async(req, res,next) => {
    try {
        const contribution = new Contribution(req.body);
        await contribution.save();
        res.status(201).json(contribution);
    }
    catch (error){
        throwError(next,error);
    }
};

const updateContribution = async(req, res,next) => {
    try {
        const contributionId = req.params.id;
        const contributionExists = await Contribution.findById(contributionId);
    
        if (!contributionExists) {
            return res.status(404).json({ error: "Contribution not found" });
        }
        const updatedContribution = await Contribution.findByIdAndUpdate(contributionId, req.body, {
            new: true,
        });  
        res.status(200).json(updatedContribution);
    } catch (error) {
        throwError(next,error);
    }
    
};

const deleteContribution = async(req, res,next) => {
    try {
        const contributionId = req.params.id;
        const contributionExists = await Contribution.findById(contributionId);
        if (!contributionExists) {
            return res.status(404).json({ error: "Contribution not found" });
        }
        await Contribution.findByIdAndDelete(contributionId);
        res.status(200).json({ message: "Contribution deleted successfully" });
    } catch (error) {
        throwError(next,error);
    }
};

export default {
    getAllContributions,
    getContributionById, 
    createContribution,
    updateContribution,
    deleteContribution,
};