// import { useState } from "react";
// import {
//   Toolbar,
//   Divider,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Drawer,
//   Box
// } from "@mui/material";
// import InboxIcon from "@mui/icons-material/Inbox";

// const SideBar = () => {
//   const drawerWidth = 240;

//   const [mobileOpen, setMobileOpen] = useState(false);
//   // const [isClosing, setIsClosing] = useState(false);

//   const handleDrawerClose = () => {
//     // setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     // setIsClosing(false);
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {["Home", "Profile", "Add Business"].map((text) => (
//           <ListItem
//             key={text}
//             disablePadding
//             sx={{
//               "&:hover": { backgroundColor: "#e0f7fa" },
//               cursor: "pointer"
//             }}
//           >
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text) => (
//           <ListItem
//             key={text}
//             disablePadding
//             sx={{
//               "&:hover": { backgroundColor: "#e0f7fa" },
//               cursor: "pointer"
//             }}
//           >
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   // const container =
//   //   props.window !== undefined ? () => props.window().document.body : undefined;

//   return (
//     <Box
//       component="nav"
//       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: -1 }}
//     >
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onTransitionEnd={handleDrawerTransitionEnd}
//         onClose={handleDrawerClose}
//         ModalProps={{
//           keepMounted: true // Better open performance on mobile.
//         }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: drawerWidth
//           }
//         }}
//       >
//         {drawer}
//       </Drawer>

//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: drawerWidth
//           }
//         }}
//         open
//       >
//         {drawer}
//       </Drawer>
//     </Box>
//   );
// };

// export default SideBar;

import { useState } from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
  Typography,
  IconButton,
  styled,
  Avatar
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const DrawerHeader = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",

  background:
    "linear-gradient(90deg, rgba(252,176,69,1) 10%, rgba(253,29,29,1) 91%)",
  color: "white",
  padding: theme.spacing(0, 1),
  paddingLeft: "16px",
  ...theme.mixins.toolbar
}));

const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDraweronClick = (e, path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const handleDrawerToggle = () => {
    console.log("clicked");
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton sx={{ p: 0 }}>
          <Avatar
            sx={{ width: "40px", height: "40px", mr: 1, position: "sticky" }}
            alt="AppLogo"
            src="\images\sirviLogo.png"
          />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {t("SIRVIAPP")}
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          { text: "Home", path: "/sirviApp" },
          { text: "Profile", path: "/sirviApp/profile" },
          { text: "Student", path: "/sirviApp/student" },
          { text: "Business", path: "/sirviApp/business" },
          { text: "Professional", path: "/sirviApp/professional" }
        ].map(({ text, path }) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              "&:hover": { backgroundColor: "#e0f7fa" },
              cursor: "pointer",
              backgroundColor: isActive(path) ? "#e0f7fa" : "transparent"
            }}
            onClick={(e) => handleDraweronClick(e, path)}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{ color: isActive(path) ? "#b28704" : "#b28704" }}
              >
                {text === "Home" && <HomeIcon />}
                {text === "Profile" && <PersonIcon />}
                {text === "Student" && <PersonIcon></PersonIcon>}
                {text === "Business" && <BusinessIcon />}
                {text === "Professional" && <BusinessIcon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    color={isActive(path) ? "#b28704" : "#b28704"}
                    variant="subtitle1"
                    sx={{
                      fontSize: i18n.language === "hi" && "1.1rem"
                    }}
                  >
                    {t(text)}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              "&:hover": { backgroundColor: "#e0f7fa" },
              cursor: "pointer"
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "#b28704" }}>
                {text === "All mail" && <MailIcon />}
                {text === "Trash" && <DeleteIcon />}
                {text === "Spam" && <ReportIcon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="#b28704" variant="subtitle1">
                    {t(text)}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        color="#ffffff"
        onClick={handleDrawerToggle}
        aria-label="open drawer"
        edge="start"
        sx={{
          display: { md: "none" },
          position: "absolute",
          top: 8,
          left: 16,
          zIndex: 30
        }}
      >
        <MenuIcon sx={{ color: "#ffffff" }} />
      </IconButton>
      <Box
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, zIndex: 0 }}
      >
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth
              }
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#fafafa"
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
