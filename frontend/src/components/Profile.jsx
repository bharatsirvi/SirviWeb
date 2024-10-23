import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = window.location;
  const initialPathArray = pathname.split("/");
  const initialPath = initialPathArray[initialPathArray.length - 1];
  const [value, setValue] = React.useState(
    initialPath === "edit" ? "edit" : "info"
  );
  React.useEffect(() => {
    const tabValue = initialPath === "edit" ? "edit" : "info";
    setValue(tabValue);
  }, [initialPath]);

  const handleChange = (event, newValue) => {
    console.debug("new value", newValue);
    setValue(newValue);
    newValue === "edit"
      ? navigate("/sirviApp/profile/edit")
      : navigate("/sirviApp/profile");
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
          sx={{ bgcolor: "background.paper" }}
        >
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("INFO")}
            value="info"
          />
          <Tab
            sx={{ fontSize: i18n.language === "hi" ? "1.1rem" : " 0.9rem" }}
            label={t("UPDATE")}
            value="edit"
          />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
};

export default Profile;
