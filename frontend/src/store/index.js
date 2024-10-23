import { configureStore } from "@reduxjs/toolkit";
import { loginDataSlice } from "./loginSlice.js";
import { fetchStatusSlice } from "./fetchStatusSlice.js";
import userDataReducer from "./userDataSlice";
import studentDataReducer from "./studentSlice";
import businessDataReducer from "./businessSlice";
import usersDataReducer from "./usersDataSlice";
import studentsDataReducer from "./studentsDataSlice";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["studentData", "businessData", "usersData", "studentsData"] // Only persist the student slice
};

const rootReducer = combineReducers({
  loginData: loginDataSlice.reducer,
  userData: userDataReducer,
  fetchStatus: fetchStatusSlice.reducer,
  studentData: studentDataReducer,
  businessData: businessDataReducer,
  usersData: usersDataReducer,
  studentsData: studentsDataReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Create a persistor
export const persistor = persistStore(store);

// Export the store
export default store;
