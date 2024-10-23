import axios from "axios";

export const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`http://localhost:8080/student/${studentId}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.error("Error deleting student:");
    throw error;
  }
};

export const updateStudent = async (studentId, updatedData) => {
  updatedData.study_level === "School"
    ? (updatedData.college_year = "")
    : updatedData.study_level === "College"
    ? (updatedData.curr_class = "")
    : updatedData.study_level === "Higher"
    ? ((updatedData.college_year = ""), (updatedData.curr_class = ""))
    : null;
  console.log("data after clearing", updatedData);
  try {
    const response = await axios.put(
      `http://localhost:8080/student/${studentId}`,
      updatedData
    );
    console.log("Student updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update student", error);
    throw error;
  }
};

export const getAllStudentsAddByUser = async (userId) => {
  try {
    let response = await axios.get(
      `http://localhost:8080/student/?addedBy=${userId}`
    );
    console.log("Students fetched successfully", response.data);
    response.data.map((student) => {
      console.log("before student===============>", student);
      const Gotra = student.gotra_id;
      student.gotra_id = Gotra._id;
      student.gotra = Gotra.name;
      console.log("after student===============>", student);
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch students", error);
    throw error;
  }
};
