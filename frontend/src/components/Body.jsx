import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const drawerWidth = 240;
function Body() {
  return (
    <Box
      component="main"
      sx={{
        height: "91vh",
        flexGrow: 1,
        marginTop: { xs: "56px", sm: "64px" },
        width: {
          sm: `calc(100% - ${drawerWidth}px)`
        },
        overflowY: "auto",
        position: "relative"
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Body;
