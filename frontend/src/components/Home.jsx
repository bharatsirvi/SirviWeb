import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Professional = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const initialPathArray = pathname.split("/");
  const initialPath = initialPathArray[initialPathArray.length - 1];
  const { t, i18n } = useTranslation();
  const [value, setValue] = React.useState("people");

  useEffect(() => {
    let tabValue = "";
    switch (initialPath) {
      case "sirviApp" || "":
        tabValue = "people";
        break;

      case "students":
        tabValue = "students";
        break;

      case "businesses":
        tabValue = "businesses";
        break;

      case "events":
        tabValue = "events";
        break;

      case "photos":
        tabValue = "photos";
        break;

      case "contributions":
        tabValue = "contributions";
        break;
    }

    setValue(tabValue);
  }, [initialPath]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "people":
        navigate("/sirviApp");
        break;

      case "students":
        navigate("/sirviApp/students");
        break;

      case "businesses":
        navigate("/sirviApp/businesses");
        break;

      case "events":
        navigate("/sirviApp/events");
        break;

      case "photos":
        navigate("/sirviApp/photos");
        break;

      case "contributions":
        navigate("/sirviApp/contributions");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 10,
          marginBottom: 2
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            bgcolor: "background.paper"
          }}
        >
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("PEOPLE")}
            value="people"
          />
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("STUDENTS")}
            value="students"
          />
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("BUSINESSES")}
            value="businesses"
          />
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("EVENTS")}
            value="events"
          />
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("PHOTOS")}
            value="photos"
          />

          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("CONTRIBUTIONS")}
            value="contributions"
          />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
};

export default Professional;
