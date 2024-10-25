import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import FilterBarPeople from "./FilterBarPeople";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../store/usersDataSlice";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function People() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const users = useSelector((state) => state.usersData.filteredUsers);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
        console.log("fetched data", response.data);
        dispatch(setAllUsers(response.data));
        return response.data;
      } catch (err) {
        console.log(err);
      }
    };
    fetchedData();
  }, []);

  const handleFilterClick = (event) => {
    if (isSmallScreen) {
      setAnchorEl(event.currentTarget);
    } else {
      setShowFilterBar(!showFilterBar);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        position: "relative",
        height: "80vh"
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        sx={{
          position: "sticky",
          zIndex: 12,
          backgroundColor: "white"
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
          sx={{ margin: 2 }}
        >
          {t("Filter")}
        </Button>
        {!isSmallScreen && showFilterBar && (
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <FilterBarPeople />
          </Box>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ width: "80%", padding: 0 }}
        >
          <MenuItem
            disableGutters
            sx={{
              width: "100%",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 3,
              paddingBottom: 3
            }}
          >
            <FilterBarPeople />
          </MenuItem>
        </Menu>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 1, boxShadow: 3 }}>
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 12
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#b28704",
                  color: "#fff"
                }}
              >
                {t("Name")}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#b28704",
                  color: "#fff"
                }}
              >
                {t("Father's Name")}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#b28704",
                  color: "#fff"
                }}
              >
                {t("Gotra")}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#b28704",
                  color: "#fff"
                }}
              >
                {t("Gender")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {user.name}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {user.father_name ?? ""}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {t(user.gotra_id?.name ?? "")}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {t(user.gender ?? "")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default People;
