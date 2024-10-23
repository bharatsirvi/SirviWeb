import {
  Autocomplete,
  Box,
  Container,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip
} from "@mui/material";
import { gotraOptions } from "../utills/gotra";
import { Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { studentDataSliceAction } from "../store/studentSlice";
import { useSnackbar } from "notistack";
import {
  deleteStudent,
  getAllStudentsAddByUser,
  updateStudent
} from "../utills/student.js";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localStorage from "redux-persist/es/storage";
import { useTranslation } from "react-i18next";
// import { use } from "i18next";
dayjs.extend(utc);
dayjs.extend(timezone);

const StudentCard = ({ student }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm();
  const studyLevel = watch("study_level");

  useEffect(() => {
    reset({
      ...student,
      dob: dayjs(student.dob),
      gotra: { label: t(student.gotra), value: student.gotra }
    });
  }, [student]);

  //// datestring conversion to dd/mm/yyyy
  const date = new Date(student.dob);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const dob = `${day}/${month}/${year}`;

  //// datestring conversion to dd/mm/yyyy

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const onDelete = async (student) => {
    try {
      deleteStudent(student._id);
      enqueueSnackbar("Student Deleted", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
    } catch (error) {
      console.log("Error", error);
    }

    dispatch(studentDataSliceAction.deleteStudent(student._id));
  };
  const onSubmit = async (data) => {
    try {
      console.log("on submit", data);
      const newData = await updateStudent(student._id, data);
      console.log("response of api", newData);
      enqueueSnackbar("Student Detains Updated", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
      dispatch(
        studentDataSliceAction.updateStudent({
          ...newData,
          gotra: data.gotra.value
        })
      );
    } catch (error) {
      console.log("Error", error);
    }
    setIsEditing(false);
  };
  const onEdit = () => {
    setIsEditing(true);
  };

  const renderDetail = (label, value, name) => {
    return (
      <>
        {name === "curr_class" || name === "college_year" ? (
          studyLevel === "Higher" ? null : (
            <Grid item xs={10} sm={4} md={4} sx={{ gap: "10px" }}>
              <Grid item xs={10} mb={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {name === "curr_class" ? t("Class") : t("College Year")}:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                {isEditing ? (
                  <>
                    {name === "gender" ? (
                      <FormControl component="fieldset">
                        <FormLabel
                          component="legend"
                          sx={{ marginBottom: "0px" }}
                        >
                          {t("Gender")}
                        </FormLabel>
                        <Controller
                          name="gender"
                          control={control}
                          rules={{ required: "Gender is required" }}
                          render={({ field }) => (
                            <RadioGroup {...field} sx={{ mb: 1 }} row>
                              <FormControlLabel
                                value="Male"
                                control={<Radio />}
                                label="Male"
                              />
                              <FormControlLabel
                                value="Female"
                                control={<Radio />}
                                label="Female"
                              />
                            </RadioGroup>
                          )}
                        />
                        {errors.gender && (
                          <Typography color="error">
                            {errors.gender.message}
                          </Typography>
                        )}
                      </FormControl>
                    ) : name === "father_name" ? (
                      <Controller
                        name="father_name"
                        control={control}
                        rules={{ required: t("Father's Name is required") }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            // label="Father's Name"
                            error={!!errors.father_name}
                            size="small"
                            helperText={errors.father_name?.message}
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : name === "name" ? (
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : name === "dob" ? (
                      <Controller
                        name="dob"
                        control={control}
                        rules={{ required: "Date of Birth is required" }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            // label="Date of Birth"
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
                    ) : name === "curr_class" || name === "college_year" ? (
                      studyLevel === "School" ? (
                        // <Controller
                        //   name="curr_class"
                        //   control={control}
                        //   rules={{ required: "Current Class is required" }}
                        //   render={({ field }) => (
                        //     <TextField
                        //       {...field}
                        //       fullWidth
                        //       // label="Current Class"
                        //       error={!!errors.curr_class}
                        //       helperText={errors.curr_class?.message}
                        //       size="small"
                        //       sx={{ mb: 2 }}
                        //     />
                        //   )}
                        // />
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
                              <Select
                                {...field}
                                labelId="curr-class-label"
                                // label="Current Class"
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
                      ) : studyLevel === "Higher" ? null : (
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
                              <Select
                                {...field}
                                labelId="college-year-label"
                                // label="College Year"
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
                      )
                    ) : name === "study_level" ? (
                      <Controller
                        name="study_level"
                        control={control}
                        rules={{ required: t("Study Level is required") }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            // label="Study Level"
                            error={!!errors.study_level}
                            helperText={errors.study_level?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          >
                            <MenuItem value="School">{t("School")}</MenuItem>
                            <MenuItem value="College"> {t("College")}</MenuItem>
                            <MenuItem value="Higher">{t("Higher")}</MenuItem>
                          </TextField>
                        )}
                      />
                    ) : name === "college_year" ? (
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
                            <Select
                              {...field}
                              labelId="college-year-label"
                              // label="College Year"
                            >
                              {Array.from({ length: 5 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                  {`${i + 1} ${t("Year")}`}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {errors.college_year?.message}
                            </FormHelperText>
                          </FormControl>
                        )}
                      />
                    ) : name === "curr_class" ? (
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
                            <Select
                              {...field}
                              labelId="curr-class-label"
                              // label="Current Class"
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
                    ) : name === "studyAt" ? (
                      <Controller
                        name="studyAt"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            // label="Study At"
                            error={!!errors.studyAt}
                            helperText={errors.studyAt?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : name === "study_type" ? (
                      <Controller
                        name="study_type"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            // label="Study Type"
                            error={!!errors.study_type}
                            helperText={errors.study_type?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          >
                            <MenuItem value="Coaching">
                              {t("Coaching")}
                            </MenuItem>
                            <MenuItem value="Self Study">
                              {" "}
                              {t("Self Study")}
                            </MenuItem>
                          </TextField>
                        )}
                      />
                    ) : name === "study_place" ? (
                      <Controller
                        name="study_place"
                        control={control}
                        rules={{ required: t("Study Place is required") }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            // label="Study Place"
                            error={!!errors.study_place}
                            helperText={errors.study_place?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : name === "gotra" ? (
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
                                  // label="Gotra"
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
                    ) : name === "medium" ? (
                      <Controller
                        name="medium"
                        control={control}
                        rules={{ required: t("Medium is required") }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            // label="Medium"
                            error={!!errors.medium}
                            helperText={errors.medium?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          >
                            <MenuItem value="Hindi"> {t("Hindi")}</MenuItem>
                            <MenuItem value="English">{t("English")}</MenuItem>
                            <MenuItem value="Gujarati">
                              {t("Gujarati")}
                            </MenuItem>
                            <MenuItem value="Marathi">{t("Marathi")}</MenuItem>
                            <MenuItem value="Other">{t("Other")}</MenuItem>
                          </TextField>
                        )}
                      />
                    ) : name === "village" ? (
                      <Controller
                        name="village"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            // label="Village"
                            error={!!errors.village}
                            helperText={errors.village?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : name === "mobile" ? (
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
                            // label="Mobile Number"
                            error={!!errors.mobile}
                            helperText={errors.mobile?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : name === "email" ? (
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: t("Email is required"),
                          pattern: {
                            value:
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: t("Enter a valid email")
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            // label="Email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        )}
                      />
                    ) : null}
                  </>
                ) : (
                  <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                    {t(value)}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )
        ) : (
          <Grid item xs={10} sm={4} md={4} spacing={4} sx={{ gap: "10px" }}>
            <Grid item xs={10} mb={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {t(label)}:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {isEditing ? (
                <>
                  {name === "gender" ? (
                    <FormControl component="fieldset">
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
                        <Typography color="error">
                          {errors.gender.message}
                        </Typography>
                      )}
                    </FormControl>
                  ) : name === "father_name" ? (
                    <Controller
                      name="father_name"
                      control={control}
                      rules={{ required: t("Father's Name is required") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          // label="Father's Name"F
                          error={!!errors.father_name}
                          size="small"
                          helperText={errors.father_name?.message}
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : name === "name" ? (
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: t("Name is required") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : name === "dob" ? (
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: t("Date of Birth is required") }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          // label="Date of Birth"
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
                              sx={{ mb: 2, height: "1000px" }}
                            />
                          )}
                        />
                      )}
                    />
                  ) : name === "curr_class" || name === "college_year" ? (
                    studyLevel === "School" ? (
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
                            <Select
                              {...field}
                              labelId="curr-class-label"
                              // label="Current Class"
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
                    ) : studyLevel === "Higher" ? null : (
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
                            <Select
                              {...field}
                              labelId="college-year-label"
                              // label="College Year"
                            >
                              {Array.from({ length: 5 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                  {`${i + 1} ${t("Year")}`}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {errors.college_year?.message}
                            </FormHelperText>
                          </FormControl>
                        )}
                      />
                    )
                  ) : name === "study_level" ? (
                    <Controller
                      name="study_level"
                      control={control}
                      rules={{ required: t("Study Level is required") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          // label="Study Level"
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
                  ) : name === "college_year" ? (
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
                          <Select
                            {...field}
                            labelId="college-year-label"
                            // label="College Year"
                          >
                            {Array.from({ length: 5 }, (_, i) => (
                              <MenuItem key={i + 1} value={i + 1}>
                                {`${i + 1} ${t("Year")}`}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.college_year?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  ) : name === "curr_class" ? (
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
                          <Select
                            {...field}
                            labelId="curr-class-label"
                            // label="Current Class"
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
                  ) : name === "studyAt" ? (
                    <Controller
                      name="studyAt"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          // label="Study At"
                          error={!!errors.studyAt}
                          helperText={errors.studyAt?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : name === "study_type" ? (
                    <Controller
                      name="study_type"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          // label="Study Type"
                          error={!!errors.study_type}
                          helperText={errors.study_type?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        >
                          <MenuItem value="Coaching">{t("Coaching")}</MenuItem>
                          <MenuItem value="Self Study">
                            {t("Self Study")}
                          </MenuItem>
                        </TextField>
                      )}
                    />
                  ) : name === "study_place" ? (
                    <Controller
                      name="study_place"
                      control={control}
                      rules={{ required: t("Study Place is required") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          // label="Study Place"
                          error={!!errors.study_place}
                          helperText={errors.study_place?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : name === "gotra" ? (
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
                                // label="Gotra"
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
                  ) : name === "medium" ? (
                    <Controller
                      name="medium"
                      control={control}
                      rules={{ required: t("Medium is required") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          // label="Medium"
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
                  ) : name === "village" ? (
                    <Controller
                      name="village"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          // label="Village"
                          error={!!errors.village}
                          helperText={errors.village?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : name === "mobile" ? (
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
                          // label="Mobile Number"
                          error={!!errors.mobile}
                          helperText={errors.mobile?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : name === "email" ? (
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
                          // label="Email"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  ) : null}
                </>
              ) : (
                <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                  {t(value)}
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </>
    );
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
      elevation={5}
    >
      <CardContent
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          pb: 8
        }}
      >
        {!isEditing && (
          <Typography sx={{ fontWeight: "600", marginBottom: 3 }} variant="h5">
            {student.name}
          </Typography>
        )}

        <Grid
          container
          xs={12}
          // justifyContent="center"
          // alignItems="center"
          spacing={1}
        >
          {isEditing ? renderDetail("Name", student.name, "name") : null}
          {renderDetail("Father's Name", student.father_name, "father_name")}
          {renderDetail("Study Level", student.study_level, "study_level")}
          {studyLevel === "School" &&
            renderDetail("Class", student.curr_class, "curr_class")}
          {studyLevel === "College" &&
            renderDetail("College Year", student.college_year, "college_year")}
          {student.studyAt !== "" || isEditing
            ? renderDetail("School/Institute", student.studyAt, "studyAt")
            : null}
          {student.study_type !== null || isEditing
            ? renderDetail("Study Type", student.study_type, "study_type")
            : null}
          {renderDetail("Study Place", student.study_place, "study_place")}
          {renderDetail("Gender", student.gender, "gender")}
          {student.email !== "" || isEditing
            ? renderDetail("Email", student.email, "email")
            : null}
          {renderDetail("Mobile", student.mobile, "mobile")}
          {renderDetail("Date Of Birth", dob, "dob")}
          {renderDetail("Gotra", student.gotra, "gotra")}
          {renderDetail("Medium", student.medium, "medium")}
          {student.village !== "" || isEditing
            ? renderDetail("Village", student.village, "village")
            : null}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            top: !isEditing ? 16 : null,
            bottom: isEditing ? 16 : null,
            right: 16,
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            gap: 1
          }}
        >
          {isEditing ? (
            <Tooltip title="Save">
              <Fab type="submit" color="info" size="large" sx={{ zIndex: 0 }}>
                <SaveIcon />
              </Fab>
            </Tooltip>
          ) : null}
        </Box>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          top: !isEditing ? 16 : null,
          bottom: isEditing ? 16 : null,
          right: 16,
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: 1
        }}
      >
        {isEditing ? null : (
          <>
            <Tooltip title="Edit">
              <Fab
                color="primary"
                size="small"
                onClick={() => onEdit()}
                sx={{ zIndex: 0 }}
              >
                <EditIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Delete">
              <Fab
                color="secondary"
                size="small"
                onClick={() => onDelete(student)}
                sx={{ zIndex: 0 }}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </>
        )}
      </Box>
    </Card>
  );
};

const StudentPage = () => {
  ///fething data from server and storing in redux
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("userId").then((userId) => {
      getAllStudentsAddByUser(userId).then((data) => {
        dispatch(studentDataSliceAction.AddAllStudentsOfuser(data));
      });
    });
  }, []);
  ///fething data from server and storing in redux

  let studentsDetails = useSelector((state) => state.studentData.studentInfo);
  console.log("STUDENT data", studentsDetails);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={5} justifyContent="center">
        {studentsDetails.map((student, index) => (
          <Grid item xs={10} sm={12} md={10} key={index}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentPage;
