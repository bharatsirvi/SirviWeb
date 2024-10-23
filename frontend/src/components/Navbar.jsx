import {
  AppBar,
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import FlagIcon from "@mui/icons-material/Flag";
// import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";
import { useTranslation } from "react-i18next";
import React from "react";
// Removed unused import statement

function Navbar({ page }) {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const settings = ["Profile", "Logout"];
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [isClosing, setIsClosing] = React.useState(false);
  const userData = useSelector((state) => state.userData.userInfo);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const translation = useTranslation();
  const { t } = useTranslation();
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const toggleLanguage = () => {
    const newLanguage = translation.i18n.language === "en" ? "hi" : "en";
    translation.i18n.changeLanguage(newLanguage);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleManuItemClick = (setting) => {
    setting === "Profile" ? navigate("/sirviApp/profile") : navigate("/login");
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `100%` },
        zIndex: 20,
        ml: { sm: `${drawerWidth}px` },
        background:
          "linear-gradient(90deg, rgba(252,176,69,1) 10%, rgba(253,29,29,1) 91%)"
      }}
    >
      <Toolbar>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton> */}
        <IconButton sx={{ p: 0 }}>
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
              mr: 1,
              ml: { md: 2, sm: 4, xs: 4 }
            }}
            src="\images\sirviLogo.png"
          />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {t("SIRVIAPP")}
        </Typography>
        {page === "landingPage" && (
          <Box sx={{ flexGrow: 0, position: "absolute", right: "20px" }}>
            <Button
              color="inherit"
              sx={{ marginRight: 2 }}
              onClick={handleSignUpClick}
            >
              {t("Sign Up")}
            </Button>
            <Button color="inherit" onClick={handleLoginClick}>
              {t("Login")}
            </Button>
          </Box>
        )}
        {page === "home" && (
          <Box
            sx={{
              flexGrow: 0,
              position: "absolute",
              right: "20px",
              display: "flex"
            }}
          >
            <Grid container alignItems="center" sx={{ mr: 2 }}>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={translation.i18n.language === "hi"}
                    onChange={toggleLanguage}
                    name="languageSwitch"
                    color="default"
                  />
                }
                label={
                  <React.Fragment>
                    {isSmallScreen
                      ? translation.i18n.language === "en"
                        ? t("EN")
                        : t("HI")
                      : translation.i18n.language === "en"
                      ? t("English")
                      : t("Hindi")}
                  </React.Fragment>
                }
              />
            </Grid>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userData.profile_pic}
                  sx={{ bgcolor: "rgba(252,176,69,1)", color: "#fff" }}
                ></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleManuItemClick(setting)}
                >
                  <Typography textAlign="center">{t(setting)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
Navbar.propTypes = {
  page: PropTypes.string.isRequired // Adding prop types validation
};
export default Navbar;
