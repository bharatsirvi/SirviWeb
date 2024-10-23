import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  studentInfo: []
};

const studentDataSlice = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    setStudent(state, action) {
      state.studentInfo.push(action.payload);
    },
    deleteStudent(state, action) {
      state.studentInfo = state.studentInfo.filter(
        (student) => student._id !== action.payload
      );
    },
    updateStudent(state, action) {
      const studentIndex = state.studentInfo.findIndex(
        (student) => student._id === action.payload._id
      );
      state.studentInfo[studentIndex] = action.payload;
    },
    AddAllStudentsOfuser(state, action) {
      state.studentInfo = action.payload;
    }
  }
});

export const studentDataSliceAction = studentDataSlice.actions;

export default studentDataSlice.reducer;
