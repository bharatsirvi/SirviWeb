import { throwError } from "../util/error.js";
import Image from "../models/imageModel.js";

const getAllImages = async (req, res, next) => {
  const {location, month, year } = req.query;
  const filterQuery = {};
  try {
    if (location) {
      filterQuery.location = { $regex: `.*${location}.*`, $options: "i" };
    }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      filterQuery.upload_date= {
        $gte: startDate,
        $lte: endDate,
      };
    } else if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      filterQuery.upload_date = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    const images = await Image.find(filterQuery);
    if (!images) {
      return res.status(404).json({ error: "No images found" });
    }
    res.status(200).json(images);
  } catch (err) {
    throwError(next, err);
  }
};

const getImageById = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json(image);
  } catch (err) {
    throwError(next, err);
  }
};

const createImage = async (req, res, next) => {
  const newImage = new Image(req.body);
  try {
    if (!newImage) return res.status(404).json({ error: "Image not created" });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    throwError(next, err);
  }
};
const updateImage = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const imageExists = await Image.findById(imageId);
    if (!imageExists) {
      return res.status(404).json({ error: error.message });
    }
    const updatedImage = await Image.findByIdAndUpdate(imageId, req.body, {
      new: true,
    });
    res.status(200).json(updatedImage);
  } catch (error) {
    throwError(next, error);
  }
};

const deleteImage = async(req, res,next) => {
    try {
        const imageId = req.params.id;
        const imageExists = await Image.findById(imageId);
        if (!imageExists) {
        return res.status(404).json({ error: error.message });
        }
        await Image.findByIdAndDelete(imageId);
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        throwError(next, error);
    }
};

export default {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};
