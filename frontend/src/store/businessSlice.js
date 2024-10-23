import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessInfo: []
};

const businessDataSlice = createSlice({
  name: "businessData",
  initialState,
  reducers: {
    setImage(state, action) {
      const { businessId, image } = action.payload;
      const businessIndex = state.businessInfo.findIndex(
        (business) => business._id === businessId
      );
      state.businessInfo[businessIndex].image = image;
    },
    setBusiness(state, action) {
      state.businessInfo.push(action.payload);
    },
    deleteBusiness(state, action) {
      state.businessInfo = state.businessInfo.filter(
        (business) => business._id !== action.payload
      );
    },
    updateBusiness(state, action) {
      const businessIndex = state.businessInfo.findIndex(
        (business) => business._id === action.payload._id
      );
      state.businessInfo[businessIndex] = action.payload;
    },

    clearAll(state) {
      state.businessInfo = [];
    },
    AddAllBusinessOfuser(state, action) {
      state.businessInfo = action.payload;
    }
  }
});

export const businessDataSliceAction = businessDataSlice.actions;

export default businessDataSlice.reducer;
