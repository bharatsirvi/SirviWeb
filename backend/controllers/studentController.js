import Student from "../models/studentModel.js";
import Gotra from "../models/gotraModel.js";
import { throwError } from "../util/error.js";
import mongoose from "mongoose";
// const { ObjectId } = mongoose.Types;

const getAllStudents = async (req, res, next) => {
  const {
    name,
    study_place,
    gender,
    medium,
    study_level,
    curr_class,
    college_year,
    study_type,
    gotra,
    addedBy,
  } = req.query;

  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `^${name}`, $options: "i" };
      console.log(filterQuery.name);
    }
    if (study_place) {
      filterQuery.study_place = { $regex: `^${study_place}`, $options: "i" };
      console.log(filterQuery.study_place);
    }
    if (gender) {
      filterQuery.gender = gender;
    }
    if (medium) {
      filterQuery.medium = medium;
    }
    if (addedBy) {
      filterQuery.addedBy = addedBy;
    }
    if (study_level) {
      filterQuery.study_level = study_level;
      if (study_level === "college") {
        if (college_year) {
          filterQuery.college_year = college_year;
        }
      } else if (study_level === "school") {
        if (curr_class) {
          filterQuery.curr_class = curr_class;
        }
      }
    }
    if (study_type) {
      filterQuery.study_type = study_type;
    }
    if (gotra) {
      const studentGotra = await Gotra.find({ name: gotra });
      if (studentGotra.length === 0) {
        return res.status(404).json({ error: "No student found" });
      }
      filterQuery.gotra_id = studentGotra[0]._id;
    }
    console.log("filterQuery", filterQuery);

    // const students = await Student.aggregate([
    //   { $match: filterQuery },
    //   {
    //     $lookup: {
    //       from: "Gotras",
    //       localField: "gotra_id",
    //       foreignField: "_id",
    //       as: "gotraDetails",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$gotraDetails",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $addFields: {
    //       gotra: "$gotraDetails.name",
    //     },
    //   },
    //   {
    //     $project: {
    //       gotraDetails: 0, // Optionally remove the gotraDetails field
    //     },
    //   },
    // ]).exec();
    const students = await Student.find(filterQuery).populate("gotra_id");
    if (!students) {
      return res.status(404).json({ error: "No students found" });
    }
    console.log("students", students);
    res.status(201).json(students);
  } catch (error) {
    throwError(next, error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    throwError(next, error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const { gotra } = req.body;
    console.log("gotra", gotra);
    const gotraName = gotra.value;
    const GotraObj = await Gotra.findOne({ name: gotraName });
    console.log("GotraObj", GotraObj);
    const gotra_id = GotraObj._id;
    req.body.gotra_id = gotra_id;
    const newStudent = new Student(req.body);
    if (!newStudent)
      return res.status(404).json({ error: "Student not created" });
    const savedStudent = await newStudent.save();
    console.log("before", savedStudent);
    const finares = await savedStudent.populate("gotra_id");
    console.log("after", finares);
    res.status(201).json(finares);
  } catch (error) {
    throwError(next, error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const studentExits = await Student.findById(studentId);
    if (!studentExits) {
      return res.status(404).json({ error: error.message });
    }

    const { gotra } = req.body;
    const gotraName = gotra.value;
    console.log("gotraname", gotraName);
    const GotraObj = await Gotra.findOne({ name: gotraName });
    const gotra_id = GotraObj._id;
    req.body.gotra_id = gotra_id;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    throwError(next, error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const studentExits = await Student.findById(studentId);
    if (!studentExits) {
      return res.status(404).json({ error: "Student not Exist" });
    }
    await Student.findByIdAndDelete(studentId);
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    throwError(next, error);
  }
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
