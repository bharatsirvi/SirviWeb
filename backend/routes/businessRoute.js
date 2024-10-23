import express from "express";
import businessController from "../controllers/businessController.js";

const router = express.Router();

// GET /businesses
router.get("/", businessController.getAllBusinesses);

// GET /businesses/:id
router.get("/:id", businessController.getBusinessById);

// POST /businesses
router.post("/", businessController.createBusiness);

// PUT /businesses/:id
router.put("/:id", businessController.updateBusiness);

// DELETE /businesses/:id
router.delete("/:id", businessController.deleteBusiness);

router.put("/:id/image", businessController.updateBusinessImage);

// GET profile picture
router.get("/:id/image", businessController.getBusinessImage);

router.delete("/:id/image", businessController.deleteBusinessImage);
export default router;
