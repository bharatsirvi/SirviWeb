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
  const [value, setValue] = React.useState(
    initialPath === "professional" ? "view_professional" : "add_professional"
  );

  useEffect(() => {
    const tabValue =
      initialPath === "professional" ? "view_professional" : "add_professional";

    setValue(tabValue);
  }, [initialPath]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === "add_professional"
      ? navigate("/sirviApp/professional/add")
      : navigate("/sirviApp/professional");
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
            label={t("VIEW PROFESSIONAL")}
            value="view_professional"
          />

          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("ADD PROFESSIONAL")}
            value="add_professional"
          />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
};

export default Professional;
