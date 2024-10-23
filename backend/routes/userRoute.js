import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", userController.getAllUsers);

// GET a single user
router.get("/:id", userController.getUserById);

// POST a new user
router.post("/", userController.createUser);

// PUT update a user
router.put("/:id", userController.updateUser);

// DELETE a user
router.delete("/:id", userController.deleteUser);

router.put("/:id/profile_pic", userController.updateUserProfilePic);

// GET profile picture
router.get("/:id/profile_pic", userController.getUserProfilePic);

export default router;
