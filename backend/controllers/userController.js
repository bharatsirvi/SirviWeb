import Gotra from "../models/gotraModel.js";
import User from "../models/userModel.js";
import { throwError } from "../util/error.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllUsers = async (req, res, next) => {
  const { name, gender, gotra } = req.query;
  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `^${name}`, $options: "i" };
    }
    if (gender) {
      filterQuery.gender = gender;
    }
    if (gotra) {
      const userGotra = await Gotra.find({ name: gotra });
      if (userGotra.length > 0) {
        filterQuery.gotra_id = userGotra[0]._id;
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
    const users = await User.find(filterQuery).populate("gotra_id");
    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(201).json(users);
  } catch (error) {
    throwError(next, error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const gotra = await Gotra.findById(user.gotra_id);

    let userObj = user.toObject();
    if (gotra) {
      userObj.gotra = gotra.name;
    }
    delete userObj.password;

    res.status(200).json(userObj);
  } catch (error) {
    throwError(next, error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    if (!newUser) return res.status(404).json({ error: "User not created" });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    throwError(next, error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userExits = await User.findById(userId);
    if (!userExits) {
      return res.status(404).json({ error: error.message });
    }
    ////////////////////////////
    const { gotra } = req.body;
    console.log("gotra", gotra);
    const gotraName = gotra.value;
    const GotraObj = await Gotra.findOne({ name: gotraName });
    console.log("GotraObj", GotraObj);
    const gotra_id = GotraObj._id;

    req.body.gotra_id = gotra_id;
    ////////////////////////////

    // ............................... implement image handle....

    let updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).lean();
    delete updatedUser.password;
    res.status(200).json(updatedUser);
  } catch (error) {
    throwError(next, error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userExits = await User.findById(userId);
    if (!userExits) {
      return res.status(404).json({ error: "User not Exist" });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    throwError(next, error);
  }
};
const updateUserProfilePic = async (req, res) => {
  const userId = req.params.id;
  const profilePicBase64 = req.body.profile_pic;

  if (!profilePicBase64) {
    return res.status(400).json({ message: "No profile picture provided" });
  }

  const profilePicPath = path.join(
    __dirname,
    "../uploads/profile_pics",
    `${userId}_profile_pic.jpg`
  );
  const profilePicBuffer = Buffer.from(profilePicBase64, "base64");

  try {
    fs.writeFileSync(profilePicPath, profilePicBuffer);
    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error saving profile picture:", error);
    res.status(500).json({ message: "Failed to update profile picture" });
  }
};

const getUserProfilePic = (req, res) => {
  const userId = req.params.id;
  const profilePicPath = path.join(
    __dirname,
    "../uploads/profile_pics",
    `${userId}_profile_pic.jpg`
  );
  //changed status added
  res.status(200).sendFile(profilePicPath, (err) => {
    if (err) {
      res.send(false);
    }
  });
};

// const updateUserProfilePic = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const { profile_pic } = req.body;

//     if (!profile_pic) {
//       return res.status(400).json({ error: "No image provided" });
//     }

//     const imageBuffer = Buffer.from(profile_pic, 'base64');

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.profile_pic = imageBuffer;
//     await user.save();

//     res.status(200).json({ message: "Profile picture updated successfully", profile_pic: user.profile_pic });
//   } catch (error) {
//     throwError(next, error);
//   }
// };

// const getUserProfilePic = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId);

//     if (!user || !user.profile_pic) {
//       return res.status(404).json({ error: "profile picture not found" });
//     }

//     res.set("Content-Type", "image/jpeg");
//     res.send(user.profile_pic);

//   } catch (error) {
//     throwError(next, error);
//   }
// };

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserProfilePic,
  getUserProfilePic,
};
