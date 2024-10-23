import express from "express";
import otpController from "../controllers/otpController.js";

const router = express.Router();

router.post("/send", otpController.sendOtp);

router.post("/verify", otpController.verifyOtp);

export default router;
