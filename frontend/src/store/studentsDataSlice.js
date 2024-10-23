import { createSlice } from "@reduxjs/toolkit";

const studentsDataSlice = createSlice({
  name: "studentsData",
  initialState: {
    studentsAllData: [],
    filteredStudents: []
  },
  reducers: {
    // filterStudents: (state, action) => {
    //   const { name, gotra, gender } = action.payload;

    //   state.filteredStudents = state.studentsAllData.filter((student) => {
    //     const hasGotraId = student.gotra_id;
    //     const hasGender = student.gender;

    //     const nameMatch =
    //       name && student.name.toLowerCase().startsWith(name.toLowerCase());

    //     const gotraMatch =
    //       gotra && hasGotraId && student.gotra_id.name.includes(gotra);

    //     const genderMatch = gender && hasGender && student.gender === gender;

    //     return (
    //       (!name || nameMatch) &&
    //       (!gotra || gotraMatch) &&
    //       (!gender || genderMatch)
    //     );
    //   });
    // },

    filterStudents: (state, action) => {
      const {
        name,
        gotra,
        gender,
        medium,
        study_level,
        study_type,
        studyAt,
        study_place,
        curr_class,
        college_year
      } = action.payload;

      state.filteredStudents = state.studentsAllData.filter((student) => {
        const nameMatch = name
          ? student.name?.toLowerCase().startsWith(name.toLowerCase())
          : true;
        const gotraMatch = gotra
          ? student.gotra_id?.name?.includes(gotra)
          : true;
        const genderMatch = gender ? student.gender?.includes(gender) : true;
        const mediumMatch = medium ? student.medium?.includes(medium) : true;
        const studyLevelMatch = study_level
          ? student.study_level?.includes(study_level)
          : true;
        const currClassMatch = curr_class
          ? student.curr_class?.toString() === curr_class.toString()
          : true;
        const collegeYearMatch = college_year
          ? student.college_year?.toString() === college_year.toString()
          : true;
        const studyTypeMatch = study_type
          ? student.study_type?.includes(study_type)
          : true;
        const studyAtMatch = studyAt
          ? student.studyAt?.toLowerCase().includes(studyAt.toLowerCase())
          : true;
        const studyPlaceMatch = study_place
          ? student.study_place
              ?.toLowerCase()
              .includes(study_place.toLowerCase())
          : true;

        return (
          nameMatch &&
          gotraMatch &&
          genderMatch &&
          mediumMatch &&
          currClassMatch &&
          collegeYearMatch &&
          studyLevelMatch &&
          studyTypeMatch &&
          studyAtMatch &&
          studyPlaceMatch
        );
      });
    },

    setAllStudents: (state, action) => {
      state.studentsAllData = action.payload;
      state.filteredStudents = action.payload;
    }
  }
});

export const { filterStudents, setAllStudents } = studentsDataSlice.actions;

export default studentsDataSlice.reducer;
