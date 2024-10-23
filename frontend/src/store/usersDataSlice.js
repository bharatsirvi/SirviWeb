// src/features/users/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const usersDataSlice = createSlice({
  name: "usersData",
  initialState: {
    usersAllData: [],
    filteredUsers: []
  },
  reducers: {
    filterUsers: (state, action) => {
      const { name, gotra, gender } = action.payload;

      state.filteredUsers = state.usersAllData.filter((user) => {
        const hasGotraId = user.gotra_id;
        const hasGender = user.gender;

        // Filter by name
        const nameMatch =
          name && user.name.toLowerCase().startsWith(name.toLowerCase());

        // Filter by gotra if gotra is provided and user has gotra_id
        const gotraMatch =
          gotra && hasGotraId && user.gotra_id.name.includes(gotra);

        // Filter by gender if gender is provided and user has gender
        const genderMatch = gender && hasGender && user.gender === gender;

        // Return true if all conditions are met or if the filter parameter is undefined or empty
        return (
          (!name || nameMatch) &&
          (!gotra || gotraMatch) &&
          (!gender || genderMatch)
        );
      });
    },

    setAllUsers: (state, action) => {
      state.usersAllData = action.payload;
      state.filteredUsers = action.payload;
    }
  }
});

export const { filterUsers, setAllUsers } = usersDataSlice.actions;

export default usersDataSlice.reducer;
