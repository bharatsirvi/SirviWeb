import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Body from "./Body";
import SideBar from "./Sidebar";
import { useEffect } from "react";
import axios from "axios";
import { userDataSliceAction } from "../store/userDataSlice";
import { useDispatch } from "react-redux";

function SirviApp() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        dispatch(userDataSliceAction.setUser(response.data));

        axios
          .get(`http://localhost:8080/user/${userId}/profile_pic`, {
            responseType: "blob"
          })
          .then((response) => {
            const imageUrl = URL.createObjectURL(response.data);
            dispatch(userDataSliceAction.setProfilePic(imageUrl));
          })
          .catch((error) => {
            console.log("Failed to fetch user Image:", error);
          });
      })
      .catch((error) => {
        console.log("Failed to fetch user data:", error);
      });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar page="home" />
        <SideBar />
        <Body />
      </Box>
    </>
  );
}

export default SirviApp;
