import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { throwError } from "../util/error.js";
import { Error } from "mongoose";
import { validationResult } from "express-validator";

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.data = errors.array();
    error.statusCode = 422;
    return throwError(next, error);
  }
  const name = req.body.name;
  const password = req.body.password;
  const mobile = req.body.mobile;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        mobile: mobile,
        password: hashedPassword,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      throwError(next, err);
    });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed");
    error.data = errors.array();
    error.statusCode = 422;
  }
  const mobile = req.body.mobile;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ mobile: mobile })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this moblie no.was not found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(async (result) => {
      if (!result) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { mobile: loadedUser.mobile, userId: loadedUser._id.toString() },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const obj = await loadedUser.populate("gotra_id");
      console.log(obj["_doc"]);
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        ...obj["_doc"],
      });
    })
    .catch((err) => {
      throwError(next, err);
    });
};

const tokenValidation = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.userId);
    if (!user) {
      return res.json(false);
    }
    res.json(true);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export default {
  signup,
  login,
  tokenValidation,
};
