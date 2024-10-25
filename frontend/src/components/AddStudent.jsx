import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  CssBaseline,
  Grid,
  Autocomplete,
  MenuItem,
  FormHelperText,
  Select,
  InputLabel
} from "@mui/material";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { gotraOptions } from "../utills/gotra";
import { studentDataSliceAction } from "../store/studentSlice";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultValues = {
  name: "bharat",
  father_name: "hhasbas",
  gender: "Male",
  dob: null,
  mobile: "8949885630",
  email: "shh@gmail.com",
  medium: "Hindi",
  studyAt: "pali",
  curr_class: "3",
  study_level: "School",
  college_year: "",
  study_place: "pla",
  study_type: "Coaching",
  village: "khod"
};

const AddStudent = () => {
  console.log(gotraOptions);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.userData.userInfo);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const studyLevel = watch("study_level");

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      data.addedBy = userId;
      if (data.study_level === "School") {
        data.college_year = "";
      } else if (data.study_level === "College") {
        data.curr_class = "";
      } else if (data.study_level === "Higher") {
        data.curr_class = "";
        data.college_year = "";
      }
      console.log(
        "............................Student from data..>>>>>>>>>>>>>>",
        data
      );
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/student`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      enqueueSnackbar("Student Added Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
      console.log(
        "............................Student post response..>>>>>>>>>>>>>>",
        {
          ...response.data,
          gotra: data.gotra.value
        }
      );
      dispatch(
        studentDataSliceAction.setStudent({
          ...response.data,
          gotra: data.gotra.value
        })
      );

      // reset(defaultValues);
      navigate("/sirviApp/student");
    } catch (err) {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="500" sx={{ mb: 1 }}>
          {t("Add Student")}
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          <Grid item sm={10} md={8}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: t("Name is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="father_name"
                control={control}
                rules={{ required: t("Father's Name is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Father's Name")}
                    error={!!errors.father_name}
                    size="small"
                    helperText={errors.father_name?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ marginBottom: "0px" }}>
                  {t("Gender")}
                </FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: t("Gender is required") }}
                  render={({ field }) => (
                    <RadioGroup {...field} sx={{ mb: 1 }} row>
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label={t("Male")}
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label={t("Female")}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <Typography color="error">{errors.gender.message}</Typography>
                )}
              </FormControl>
              <Controller
                name="dob"
                control={control}
                rules={{ required: t("Date of Birth is required") }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label={t("Date Of Birth")}
                    timezone="UTC"
                    clearable
                    sx={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.dob}
                        helperText={errors.dob?.message}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="mobile"
                control={control}
                rules={{
                  required: t("Mobile number is required"),
                  pattern: {
                    value: /^\d{10}$/,
                    message: t("Mobile number must be 10 digits")
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Mobile Number")}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    size="small"
                    sx={{ mb: 2, mt: 2 }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: t("Email is required"),
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: t("Enter a valid email")
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="medium"
                control={control}
                rules={{ required: t("Medium is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("Medium")}
                    error={!!errors.medium}
                    helperText={errors.medium?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Hindi">{t("Hindi")}</MenuItem>
                    <MenuItem value="English">{t("English")}</MenuItem>
                    <MenuItem value="Gujarati">{t("Gujarati")}</MenuItem>
                    <MenuItem value="Marathi">{t("Marathi")}</MenuItem>
                    <MenuItem value="Other">{t("Other")}</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="study_level"
                control={control}
                rules={{ required: t("Study Level is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("Study Level")}
                    error={!!errors.study_level}
                    helperText={errors.study_level?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="School">{t("School")}</MenuItem>
                    <MenuItem value="College">{t("College")}</MenuItem>
                    <MenuItem value="Higher">{t("Higher")}</MenuItem>
                  </TextField>
                )}
              />
              {studyLevel === "School" && (
                <Controller
                  name="curr_class"
                  control={control}
                  rules={{ required: t("Current Class is required") }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.curr_class}
                      sx={{ mb: 2 }}
                      size="small"
                    >
                      <InputLabel id="curr-class-label">
                        {t("Class")}
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="curr-class-label"
                        label={t("Class")}
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.curr_class?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              )}
              {studyLevel === "College" && (
                <Controller
                  name="college_year"
                  control={control}
                  rules={{ required: t("College Year is required") }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.college_year}
                      sx={{ mb: 2 }}
                      size="small"
                    >
                      <InputLabel id="college-year-label">
                        {t("College Year")}
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="college-year-label"
                        label={t("College Year")}
                      >
                        {Array.from({ length: 5 }, (_, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.college_year?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              )}
              <Controller
                name="studyAt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("School/Institute")}
                    error={!!errors.studyAt}
                    helperText={errors.studyAt?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="study_place"
                control={control}
                rules={{ required: t("Study Place is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Study Place")}
                    error={!!errors.study_place}
                    helperText={errors.study_place?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="study_type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("Study Type")}
                    error={!!errors.study_type}
                    helperText={errors.study_type?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Coaching">{t("Coaching")}</MenuItem>
                    <MenuItem value="Self Study">{t("Self Study")}</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="village"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Village")}
                    error={!!errors.village}
                    helperText={errors.village?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="gotra"
                control={control}
                rules={{ required: t("Gotra is required") }}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={gotraOptions.map((option) => ({
                        ...option,
                        label: t(option.label)
                      }))}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      getOptionLabel={(option) => option.label || ""}
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      renderInput={(field) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Gotra")}
                          error={!!errors.gotra}
                          helperText={errors.gotra?.message}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      )}
                    />
                  );
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                {t("Add Student")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddStudent;
