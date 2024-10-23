import express from "express";
import authController from "../controllers/authController.js";
import authValidator from "../validator/authValidator.js";
const router = express.Router();
router.post("/signup", authValidator.signup, authController.signup);
router.post("/login", authValidator.login, authController.login);
router.get("/tokenValidation", authController.tokenValidation);
export default router;
