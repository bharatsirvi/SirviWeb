import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import store, { persistor } from "./store/index.js";
import { Provider } from "react-redux";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import SirviApp from "./components/SirviApp.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoginAndSignUp from "./components/Loginandsignup.jsx";
import Profile from "./components/Profile.jsx";
import Home from "./components/Home.jsx";
import AddStudent from "./components/AddStudent.jsx";
import UserForm from "./components/UserForm.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import Student from "./components/Student.jsx";
import StudentPage from "./components/StudentPage.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import "./localization.js";
import { PersistGate } from "redux-persist/integration/react";

import AddBusiness from "./components/AddBusiness.jsx";
import BusinessPage from "./components/BusinessPage.jsx";
import BusinessCom from "./components/Business.jsx";
import React from "react";
import Professional from "./components/Professional.jsx";
import ProfessionalPage from "./components/ProfessionalPage.jsx";
import AddProfessional from "./components/AddProfessional.jsx";
import People from "./components/People.jsx";
import Businesses from "./components/Businesses.jsx";
import Students from "./components/Students.jsx";
import Photos from "./components/Photos.jsx";
import Events from "./components/Events.jsx";
import Contributions from "./components/Contributions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/sirviApp",
    element: (
      <PrivateRoute>
        <SirviApp />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/sirviApp",
        element: <Home />,
        children: [
          {
            path: "/sirviApp/",
            element: <People />
          },
          {
            path: "/sirviApp/businesses",
            element: <Businesses />
          },
          {
            path: "/sirviApp/students",
            element: <Students />
          },
          {
            path: "/sirviApp/photos",
            element: <Photos />
          },
          {
            path: "/sirviApp/events",
            element: <Events />
          },
          {
            path: "/sirviApp/contributions",
            element: <Contributions />
          }
        ]
      },

      {
        path: "/sirviApp/profile",
        element: <Profile />,
        children: [
          {
            path: "/sirviApp/profile",
            element: <ProfilePage />
          },
          {
            path: "/sirviApp/profile/edit",
            element: <UserForm />
          }
        ]
      },
      {
        path: "/sirviApp/student",
        element: <Student />,
        children: [
          {
            path: "/sirviApp/student",
            element: <StudentPage />
          },
          {
            path: "/sirviApp/student/add",
            element: <AddStudent />
          }
        ]
      },
      {
        path: "/sirviApp/business",
        element: <BusinessCom />,
        children: [
          {
            path: "/sirviApp/business",
            element: <BusinessPage />
          },
          {
            path: "/sirviApp/business/add",
            element: <AddBusiness />
          }
        ]
      },
      {
        path: "/sirviApp/professional",
        element: <Professional />,
        children: [
          {
            path: "/sirviApp/professional",
            element: <ProfessionalPage />
          },
          {
            path: "/sirviApp/professional/add",
            element: <AddProfessional />
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <LoginAndSignUp />,
    children: [
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
  {
    path: "/signup",
    element: <LoginAndSignUp />,
    children: [
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <CssBaseline />
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
          </Provider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
