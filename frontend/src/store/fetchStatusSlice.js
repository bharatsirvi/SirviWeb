import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: false,
  reducers: {
    setFetching: (state, action) => {
      state = action.payload;
    }
  }
});

export const fetchStatusSliceAction = fetchStatusSlice.actions;
export { fetchStatusSlice };
