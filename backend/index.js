import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
import { connect } from "mongoose";
import userRouter from "./routes/userRoute.js";
import gotraRouter from "./routes/gotraRoute.js";
import studentRouter from "./routes/studentRoute.js";
import eventRouter from "./routes/eventRoute.js";
import imageRouter from "./routes/imageRoute.js";
import transactionRouter from "./routes/transactionRoute.js";
import businessRouter from "./routes/businessRoute.js";
import professionalRouter from "./routes/professionalRoute.js";
import contributionRouter from "./routes/contributionRoute.js";
import otpRouter from "./routes/otpRoute.js";
import authRouter from "./routes/authRoute.js";
import path from "path";

const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json({ limit: "50mb" }));

app.use(cors());
app.use(
  cors({
    origin: "*", // Adjust the origin as necessary
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,responseType",
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/uploads/profile_pics",
  express.static(path.join(__dirname, "uploads", "profile_pics"))
);

app.use(
  "/uploads/business_pics",
  express.static(path.join(__dirname, "uploads", "business_pics"))
);
// Base URL
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/otp", otpRouter);
app.use("/user", userRouter);
app.use("/gotra", gotraRouter);
app.use("/student", studentRouter);
app.use("/event", eventRouter);
app.use("/image", imageRouter);
app.use("/transaction", transactionRouter);
app.use("/business", businessRouter);
app.use("/professional", professionalRouter);
app.use("/contribution", contributionRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message, data: error.data });
});

connect(
  "mongodb+srv://bharatsirvi855:hRgzlQvJbPxlKwBJ@sirvidata.pi0qkk2.mongodb.net/sirviDb?retryWrites=true&w=majority&appName=sirviData"
)
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {
      console.log("Server connected");
    });
  })
  .catch((err) => {
    console.error(err);
  });
