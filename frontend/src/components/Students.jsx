import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  Grid,
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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllStudents } from "../store/studentsDataSlice";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import FilterBarStudents from "./FilterBarStudents";

function Students() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const columns = [
    "name",
    "father_name",
    "gotra",
    "study_level",
    "medium",
    "gender",
    "curr_class",
    "college_year",
    "studyAt",
    "study_type",
    "study_place"
  ];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const initialColumns = isSmallScreen
    ? ["name", "gotra", "study_level"]
    : columns;
  const [selectedColumns, setSelectedColumns] = useState(initialColumns);
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    name: false,
    gotra: false,
    medium: false,
    study_level: false,
    curr_class: false,
    college_year: false,
    study_type: false,
    studyAt: false,
    study_place: false,
    all_checkbox: false
  });

  const students = useSelector((state) => state.studentsData.filteredStudents);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/student");
        console.log("fetched data", response.data);
        dispatch(setAllStudents(response.data));
        return response.data;
      } catch (err) {
        console.log(err);
      }
    };
    fetchedData();
  }, []);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCheckboxChange = (option) => {
    {
      option === "all_checkbox"
        ? setFilterOptions((prevOptions) => ({
            name: false,
            gotra: false,
            medium: false,
            study_level: false,
            curr_class: false,
            college_year: false,
            study_type: false,
            studyAt: false,
            study_place: false,
            all_checkbox: !prevOptions[option]
          }))
        : setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
            all_checkbox: false
          }));
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColoumClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const handleChipClick = (column) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  const handleColumnMenuClose = () => {
    setColumnAnchorEl(null);
  };
  const getColumnLabel = (column) => {
    switch (column) {
      case "name":
        return t("Name");
      case "father_name":
        return t("Father's Name");
      case "curr_class":
        return t("Class");
      case "gotra":
        return t("Gotra");
      case "mediym":
        return t("Medium");
      case "gender":
        return t("Gender");
      case "study_level":
        return t("Study Level");
      case "study_type":
        return t("Study Type");
      case "study_place":
        return t("Study Place");
      case "studyAt":
        return t("School/Institute");
      case "college_year":
        return t("College Year");
      default:
        return column;
    }
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
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
      >
        <Box
          width="100%"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 12,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start"
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

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ width: "100%", padding: 0, mt: 3 }}
          >
            {Object.keys(filterOptions).map((option) => (
              <MenuItem
                key={option}
                disableGutters
                sx={{
                  paddingRight: 2,
                  paddingLeft: 2,

                  ...(option === "all_checkbox" && {
                    color: "red"
                  }),
                  "&.Mui-checked": {
                    color: option === "all_checkbox" && "red"
                  }
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        ...(option === "all_checkbox" && {
                          color: "red"
                        })
                      }}
                      checked={filterOptions[option]}
                      onChange={() => handleCheckboxChange(option)}
                    />
                  }
                  label={
                    option === "name"
                      ? t("Name")
                      : option === "gotra"
                      ? t("Gotra")
                      : option === "studyAt"
                      ? t("School/Institute")
                      : option === "curr_class"
                      ? t("Class")
                      : option === "college_year"
                      ? t("College Year")
                      : option === "medium"
                      ? t("Medium")
                      : option === "study_level"
                      ? t("Study Level")
                      : option === "study_place"
                      ? t("Study Place")
                      : option === "study_type"
                      ? t("Study Type")
                      : option === "all_checkbox"
                      ? t("Remove All")
                      : { option }
                  }
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          // width="100%"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 12,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ViewColumnIcon />}
            onClick={handleColoumClick}
            sx={{ margin: 2 }}
          >
            {t("columns")}
          </Button>
          <Menu
            anchorEl={columnAnchorEl}
            open={Boolean(columnAnchorEl)}
            onClose={handleColumnMenuClose}
            mt={4}
          >
            <Grid
              container
              xs={12}
              spacing={{ sm: 1 }}
              p={1}
              sx={{ width: { xs: "200px", sm: "400px", md: "500px" } }}
            >
              {columns.map((column) => (
                <Grid item key={column} xs={12} sm={6} md={4}>
                  <MenuItem disableGutters sx={{ padding: 0 }}>
                    <Chip
                      label={getColumnLabel(column)}
                      color={
                        selectedColumns.includes(column) ? "primary" : "default"
                      }
                      onClick={() => handleChipClick(column)}
                      sx={{ margin: 0.5, width: "100%" }}
                    />
                  </MenuItem>
                </Grid>
              ))}
            </Grid>
          </Menu>
        </Box>
      </Box>
      <FilterBarStudents filterOptions={filterOptions} />

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
              {selectedColumns.includes("name") && (
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
              )}
              {selectedColumns.includes("father_name") && (
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
              )}

              {selectedColumns.includes("gotra") && (
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
              )}
              {selectedColumns.includes("study_level") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("Study Level")}
                </TableCell>
              )}
              {selectedColumns.includes("medium") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("Medium")}
                </TableCell>
              )}
              {selectedColumns.includes("gender") && (
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
              )}

              {selectedColumns.includes("curr_class") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("Class")}
                </TableCell>
              )}
              {selectedColumns.includes("college_year") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("College Year")}
                </TableCell>
              )}
              {selectedColumns.includes("studyAt") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("School/Institute")}
                </TableCell>
              )}

              {selectedColumns.includes("study_type") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("Study Type")}
                </TableCell>
              )}

              {selectedColumns.includes("study_place") && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#b28704",
                    color: "#fff"
                  }}
                >
                  {t("Study Place")}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={selectedColumns.length} align="center">
                  <Typography variant="body1">No students found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student._id}>
                  {selectedColumns.includes("name") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.name}
                    </TableCell>
                  )}
                  {selectedColumns.includes("father_name") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.father_name}
                    </TableCell>
                  )}

                  {selectedColumns.includes("gotra") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {t(student.gotra_id.name)}
                    </TableCell>
                  )}
                  {selectedColumns.includes("study_level") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {t(student.study_level)}
                    </TableCell>
                  )}
                  {selectedColumns.includes("medium") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {t(student.medium)}
                    </TableCell>
                  )}
                  {selectedColumns.includes("gender") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {t(student.gender)}
                    </TableCell>
                  )}
                  {selectedColumns.includes("curr_class") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.curr_class ? t(student.curr_class) : "-"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("college_year") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.college_year ? t(student.college_year) : "-"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("studyAt") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.studyAt ? t(student.studyAt) : "-"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("study_type") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.study_type ? t(student.study_type) : "-"}
                    </TableCell>
                  )}

                  {selectedColumns.includes("study_place") && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {student.study_place ? t(student.study_place) : "-"}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Students;
