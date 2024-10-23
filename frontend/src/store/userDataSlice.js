// userDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    name: "",
    mobile: "",
    email: "",
    gotra: "",
    father_name: "",
    dob: null,
    profile_pic: ""
  }
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setName(state, action) {
      state.userInfo.name = action.payload;
    },
    setMobile(state, action) {
      state.userInfo.mobile = action.payload;
    },
    setEmail(state, action) {
      state.userInfo.email = action.payload;
    },
    setGotra(state, action) {
      state.userInfo.gotra = action.payload;
    },
    setFatherName(state, action) {
      state.userInfo.father_name = action.payload;
    },
    setDOB(state, action) {
      state.userInfo.dob = action.payload;
    },
    setProfilePic(state, action) {
      state.userInfo.profile_pic = action.payload;
    },
    setUser(state, action) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload
      };
    }
  }
});

export const userDataSliceAction = userDataSlice.actions;

export default userDataSlice.reducer;

///{
//   name: userData.name,
//   father_name: userData.father_name,
//   dob: userData.dob ? dayjs(userData.dob) : null,
//   gender: userData.gender,
//   mobile: userData.mobile,
//   email: userData.email,
//   gotra: userData.gotra
// }
