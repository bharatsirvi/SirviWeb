import { useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Grid,
  Box
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { gotraOptions } from "../utills/gotra";
import { filterStudents } from "../store/studentsDataSlice";
import { Controller, useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
const gotraOptionsWithNone = [{ label: "None", value: "" }, ...gotraOptions];
const classOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const collegeYearOptions = Array.from({ length: 5 }, (_, i) => i + 1);

const FilterBarStudents = ({ filterOptions }) => {
  const { t } = useTranslation();
  const { control, setValue, watch, getValues } = useForm();
  const dispatch = useDispatch();
  const watchedValues = watch();
  const debouncedFilter = debounce((filterQuary) => {
    dispatch(filterStudents(filterQuary));
  }, 1000); // Adjust the debounce delay as needed

  useEffect(() => {
    console.log("watch props", getValues());
    const filterQuary = getValues();
    debouncedFilter(filterQuary);
  }, [watchedValues]);

  return (
    <Grid
      container
      spacing={2}
      component="form"
      padding={1}
      justifyContent={{ xs: "center", sm: "flex-start" }}
    >
      {filterOptions.name && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth>
                <TextField
                  {...field}
                  id="name-input"
                  fullWidth
                  size="small"
                  label={
                    <Box fontSize={14} display="flex" alignItems="center">
                      <SearchIcon style={{ marginRight: 8 }} />
                      {t("Search by Name")}
                    </Box>
                  }
                  variant="outlined"
                />
              </FormControl>
            )}
          />
        </Grid>
      )}

      {filterOptions.gotra && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="gotra"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  options={gotraOptionsWithNone.map((option) => ({
                    ...option,
                    label: t(option.label)
                  }))}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label || ""}
                  value={field.value}
                  onChange={(e, value) => {
                    setValue("gotra", value.value, {
                      shouldValidate: true
                    });
                  }}
                  renderInput={(field) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label={
                        <Box fontSize={14} display="flex" alignItems="center">
                          <SearchIcon style={{ marginRight: 8 }} />
                          {t("Search by Gotra")}
                        </Box>
                      }
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
      )}

      {filterOptions.medium && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="medium"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by Medium")}
                  </Box>
                }
                size="small"
              >
                <MenuItem value="" size="small">
                  <em>{t("None")}</em>
                </MenuItem>
                <MenuItem value="Hindi">{t("Hindi")}</MenuItem>
                <MenuItem value="English">{t("English")}</MenuItem>
                <MenuItem value="Gujarati">{t("Gujarati")}</MenuItem>
                <MenuItem value="Marathi">{t("Marathi")}</MenuItem>
                <MenuItem value="Other">{t("Other")}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      )}
      {filterOptions.gender && (
        <Grid item xs={10} sm={6} lg={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel size="small">
              <Box fontSize={14} display="flex" alignItems="center">
                <SearchIcon style={{ marginRight: 8 }} />
                {t("Search by Gender")}
              </Box>
            </InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label={
                    <Box fontSize={14} display="flex" alignItems="center">
                      <SearchIcon style={{ marginRight: 8 }} />
                      {t("Search by Gender")}
                    </Box>
                  }
                  fullWidth
                  size="small"
                >
                  <MenuItem value="" size="small">
                    <em>{t("None")}</em>
                  </MenuItem>
                  <MenuItem value="Male">{t("Male")}</MenuItem>
                  <MenuItem value="Female">{t("Female")}</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      )}
      {filterOptions.study_level && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="study_level"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by Study Level")}
                  </Box>
                }
                size="small"
              >
                <MenuItem value="" size="small">
                  <em>{t("None")}</em>
                </MenuItem>
                <MenuItem value="School">{t("School")}</MenuItem>
                <MenuItem value="College">{t("College")}</MenuItem>
                <MenuItem value="Higher">{t("Higher")}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      )}
      {filterOptions.curr_class && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="curr_class"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by Class")}
                  </Box>
                }
                size="small"
              >
                <MenuItem value="" size="small">
                  <em>{t("None")}</em>
                </MenuItem>

                {classOptions.map((option) => (
                  <MenuItem key={option} value={option} size="small">
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      )}
      {filterOptions.college_year && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="college_year"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by College Year")}
                  </Box>
                }
                size="small"
              >
                <MenuItem value="" size="small">
                  <em>{t("None")}</em>
                </MenuItem>

                {collegeYearOptions.map((option) => (
                  <MenuItem key={option} value={option} size="small">
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      )}

      {filterOptions.study_type && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="study_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by Study Type")}
                  </Box>
                }
                size="small"
              >
                <MenuItem value="" size="small">
                  <em>{t("None")}</em>
                </MenuItem>
                <MenuItem value="Coaching">{t("Coaching")}</MenuItem>
                <MenuItem value="Self Study">{t("Self Study")}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      )}

      {filterOptions.studyAt && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="studyAt"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by School/Institute")}
                  </Box>
                }
                size="small"
              />
            )}
          />
        </Grid>
      )}
      {filterOptions.study_place && (
        <Grid item xs={10} sm={6} lg={4}>
          <Controller
            name="study_place"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={
                  <Box fontSize={14} display="flex" alignItems="center">
                    <SearchIcon style={{ marginRight: 8 }} />
                    {t("Search by Study Place")}
                  </Box>
                }
                size="small"
              />
            )}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default FilterBarStudents;
