import crypto from "crypto";
import twilio from "twilio";
import OTP from "../models/otpModel.js";
import express from "express";

const accountSid = "AC2c97264705f4c37564e067abb25ddaca";
const authToken = "b5ebbec877fe36128193b1326a2cada0";
const client = twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  const { phone } = req.body;

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Save OTP to the database
  const otpEntry = new OTP({ phone, otp });
  await otpEntry.save();
  const formattedPhone = `+91${phone}`;
  // Send OTP via Twilio
  client.messages
    .create({
      body: `Your Sirvi App OTP is ${otp}`,
      from: "+13257398672",
      to: formattedPhone,
    })
    .then((message) => res.status(200).send("OTP sent successfully"))
    .catch((err) => res.status(500).send("Failed to send OTP"));
};

const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  const otpEntry = await OTP.findOne({ phone, otp });
  if (!otpEntry) {
    return res.status(400).send("Invalid OTP");
  }

  // If valid, delete the OTP entry from the database
  await OTP.deleteOne({ phone, otp });

  // Proceed with the signup process (e.g., creating a new user)
  res.status(200).send("OTP verified successfully");
};

export default {
  sendOtp,
  verifyOtp,
};
