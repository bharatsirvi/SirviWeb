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
import { filterUsers } from "../store/usersDataSlice";
import { Controller, useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
const gotraOptionsWithNone = [{ label: "None", value: "" }, ...gotraOptions];
const FilterBarPeople = () => {
  const { t } = useTranslation();
  const { control, setValue, watch, getValues } = useForm();
  const dispatch = useDispatch();
  const watchedValues = watch();
  const debouncedFilter = debounce((filterQuary) => {
    dispatch(filterUsers(filterQuary));
  }, 1000); // Adjust the debounce delay as needed
  useEffect(() => {
    console.log("watch props", getValues());
    const filterQuary = getValues();
    debouncedFilter(filterQuary);
  }, [watchedValues]);

  return (
    <Grid
      container
      xs={12}
      spacing={4}
      component="form"
      justifyContent="center"
    >
      <Grid item xs={10} lg={4}>
        <Controller
          name="name"
          control={control}
          // onChange={() => console.log("hello lag bhai")}
          defaultValue=""
          render={({ field }) => (
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel htmlFor="name-input">
                <SearchIcon style={{ marginRight: 8 }} />
                Search by Name
              </InputLabel> */}

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
      <Grid item xs={10} lg={4}>
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
                  // field.onChange(value);
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
      <Grid item xs={10} lg={4}>
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
            // onChange={(e) => handleChange(e)}
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
    </Grid>
  );
};

export default FilterBarPeople;
