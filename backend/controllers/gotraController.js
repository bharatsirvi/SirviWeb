import Gotra from "../models/gotraModel.js";
import { throwError } from "../util/error.js";

const getAllGotras = async (req, res, next) => {
  try {
    const gotras = await Gotra.find();
    if (!gotras) {
      return res.status(404).json({ error: "No gotra found" });
    }
    res.status(201).json(gotras);
  } catch (error) {
    throwError(next, error);
  }
};

const getGotraById = async (req, res, next) => {
  try {
    const gotra_Id = req.params.id;
    const gotra = await Gotra.findById(gotra_Id);
    if (!gotra) {
      return res.status(404).json({ error: "gotra not found" });
    }
    res.status(200).json(gotra);
  } catch (error) {
    throwError(next, error);
  }
};

const createGotra = async (req, res, next) => {
  try {
    const newGotra = new Gotra(req.body);
    if (!newGotra) return res.status(404).json({ error: "Gotra not created" });
    const savedGotra = await newGotra.save();
    res.status(201).json(savedGotra);
  } catch (error) {
    throwError(next, error);
  }
};

const updateGotra = (req, res) => {
  // Implement logic to update a User in the database
  // Return the updated User as a response
};

const deleteGotra = (req, res) => {
  // Implement logic to delete a User from the database
  // Return a success message as a response
};

export default {
  getAllGotras,
  getGotraById,
  createGotra,
  updateGotra,
  deleteGotra,
};
