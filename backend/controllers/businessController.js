import Business from "../models/businessModel.js";
import { throwError } from "../util/error.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllBusinesses = async (req, res, next) => {
  const { name, category, owner_name, location } = req.query;
  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `.*${name}.*`, $options: "i" };
    }
    if (category) {
      filterQuery.category = { $regex: `.*${category}.*`, $options: "i" };
    }

    if (owner_name) {
      filterQuery.owner_names = { $regex: `.*${owner_name}.*`, $options: "i" };
    }
    if (location) {
      filterQuery.location = { $regex: `.*${location}.*`, $options: "i" };
    }
    const businesses = await Business.find(filterQuery);
    if (!businesses) {
      return res.status(404).json({ error: "No businesses found" });
    }
    res.status(201).json(businesses);
  } catch (error) {
    throwError(next, error);
  }
};

const getBusinessById = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }
    res.status(200).json(business);
  } catch (error) {
    throwError(next, error);
  }
};

const createBusiness = async (req, res, next) => {
  try {
    const newBusiness = new Business(req.body);
    if (!newBusiness)
      return res.status(404).json({ error: "Business not created" });
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    throwError(next, error);
  }
};

const updateBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const businessExists = await Business.findById(businessId);
    if (!businessExists) {
      return res.status(404).json({ error: error.message });
    }
    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedBusiness);
  } catch (error) {
    throwError(next, error);
  }
};

const deleteBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }
    await Business.findByIdAndDelete(businessId);
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    throwError(next, error);
  }
};

const updateBusinessImage = (req, res) => {
  const businessId = req.params.id;
  const businessPicBase64 = req.body.image;

  if (!businessPicBase64) {
    return res.status(400).json({ message: "No business picture provided" });
  }

  const businessPicPath = path.join(
    __dirname,
    "../uploads/business_pics",
    `${businessId}_business_pic.jpg`
  );
  const businessPicBuffer = Buffer.from(businessPicBase64, "base64");

  try {
    fs.writeFileSync(businessPicPath, businessPicBuffer);
    res.status(200).json({ message: "business picture updated successfully" });
  } catch (error) {
    console.error("Error saving business picture:", error);
    res.status(500).json({ message: "Failed to update business picture" });
  }
};
const getBusinessImage = (req, res) => {
  const businessId = req.params.id;
  const businessPicPath = path.join(
    __dirname,
    "../uploads/business_pics",
    `${businessId}_business_pic.jpg`
  );

  res.sendFile(businessPicPath, (err) => {
    if (err) {
      res.status(404).json({ message: "Business picture not found" });
    }
  });
};

const deleteBusinessImage = (req, res) => {
  const businessId = req.params.id;

  // Construct the path to the business image
  const businessPicPath = path.join(
    __dirname,
    "../uploads/business_pics",
    `${businessId}_business_pic.jpg`
  );

  // Check if the image file exists
  fs.access(businessPicPath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file does not exist, return a 404 response
      return res.status(404).json({ message: "Business picture not found" });
    }

    // If the file exists, attempt to delete it
    fs.unlink(businessPicPath, (err) => {
      if (err) {
        // If there was an error deleting the file, return a 500 response
        console.error("Error deleting business picture:", err);
        return res
          .status(500)
          .json({ message: "Failed to delete business picture" });
      }

      // If the file was deleted successfully, return a success message
      res
        .status(200)
        .json({ message: "Business picture deleted successfully" });
    });
  });
};
export default {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  updateBusinessImage,
  getBusinessImage,
  deleteBusinessImage,
};
