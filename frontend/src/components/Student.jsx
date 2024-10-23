import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Student = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const initialPathArray = pathname.split("/");
  const initialPath = initialPathArray[initialPathArray.length - 1];
  const { t, i18n } = useTranslation();
  console.log("path", initialPath);
  const [value, setValue] = React.useState(
    initialPath === "student" ? "view_student" : "add_student"
  );

  useEffect(() => {
    const tabValue = initialPath === "student" ? "view_student" : "add_student";
    setValue(tabValue);
  }, [initialPath]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === "add_student"
      ? navigate("/sirviApp/student/add")
      : navigate("/sirviApp/student");
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
            label={t("VIEW DETAILS")}
            value="view_student"
          />
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : "0.9rem" }}
            label={t("ADD STUDENT")}
            value="add_student"
          />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
};

export default Student;
