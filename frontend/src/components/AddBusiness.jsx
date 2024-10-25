import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Grid,
  MenuItem
} from "@mui/material";
import axios from "axios";
import { businessDataSliceAction } from "../store/businessSlice";
// import axios from "axios";
// import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
const defaultValues = {
  name: "aai mata medical store",
  location: "palanpur",
  category: "Medical",
  owner_mobile: "8989898989",
  owner_names: ["Bharat Patel", "Ramesh Patel", "Suresh Patel"],
  owner_email: "bharatsirvi@gmail.com"
};

const AddBusiness = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues
  });
  const [selectedImageName, setSelectedImageName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  // const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "owner_names"
  });

  const onSubmit = async (data) => {
    const businessImage = data.image;
    delete data.image;
    data.added_by = userId;

    console.log("submitted data ----------------------..........", data);
    console.log(
      "submitted image ----------------------..........",
      businessImage
    );

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/business`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((dataResponse) => {
        const businessId = dataResponse.data._id;
        if (businessImage !== null) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const businessPicBase64 = reader.result.split(",")[1];
            await axios
              .put(
                `${import.meta.env.VITE_BACKEND_URL}/business/${businessId}/image`,
                {
                  image: businessPicBase64
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Response-Type": "blob"
                  }
                }
              )
              .then((imageResponse) => {
                if (imageResponse.status === 200) {
                  // console.log(
                  //   "Profile picture updated successfully",
                  //   dataResponse.data
                  // );

                  ///add image to business data
                  console.log("reader.result", reader.result);
                  dataResponse.data.image = reader.result;
                  console.log("ready to dispatch", dataResponse.data);
                  dispatch(
                    businessDataSliceAction.setBusiness(dataResponse.data)
                  );
                } else {
                  console.error("Failed to update profile picture");
                }
                // dispatch(fetchStatusSliceAction.setFetching(false));
                navigate("/sirviApp/business");
              });
          };
          reader.readAsDataURL(businessImage);
        } else {
          console.log("ready to dispatch", dataResponse.data);
          dispatch(businessDataSliceAction.setBusiness(dataResponse.data));
          navigate("/sirviApp/business");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4
        }}
      >
        <Typography component="h1" variant="h5">
          {t("ADD BUSINESS")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={10}>
              <Controller
                name="name"
                control={control}
                rules={{ required: t("Name is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Business Name")}
                    size="medium"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Controller
                name="location"
                control={control}
                rules={{ required: t("Location is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Business Location")}
                    size="medium"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Controller
                name="category"
                control={control}
                rules={{ required: t("Category is required") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("Category")}
                    size="medium"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  >
                    <MenuItem value="Medical">{t("Medical")}</MenuItem>
                    <MenuItem value="Shop">{t("Shop")}</MenuItem>
                    <MenuItem value="Service">{t("Service")}</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid container xs={12} spacing={2}>
                {fields.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Controller
                      name={`owner_names[${index}]`}
                      control={control}
                      defaultValue={item.value || ""}
                      rules={{
                        required: t("Owner Name is required")
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={`${t("Owner Name")} ${index + 1}`}
                          size="medium"
                          error={!!errors.owner_names?.[index]}
                          helperText={errors.owner_names?.[index]?.message}
                        />
                      )}
                    />
                    <Button sx={{ color: "red" }} onClick={() => remove(index)}>
                      {t("Remove")}
                    </Button>
                  </Grid>
                ))}
                <Grid item xs={10} md={4}>
                  <Button sx={{ color: "green" }} onClick={() => append("")}>
                    {t("Add Owner")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Controller
                name="owner_mobile"
                control={control}
                rules={{
                  required: t("Mobile Number is required"),
                  pattern: {
                    value: /^\d{10}$/,
                    message: t("Mobile number must be 10 digits")
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Mobile")}
                    size="medium"
                    error={!!errors.owner_mobile}
                    helperText={errors.owner_mobile?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Controller
                name="owner_email"
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
                    size="medium"
                    error={!!errors.owner_email}
                    helperText={errors.owner_email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Controller
                name="image"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <label htmlFor="upload-image">
                    <input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setSelectedImageName(e.target.files[0].name);
                        field.onChange(e.target.files[0]);
                      }}
                    />
                    <Grid container>
                      <Button variant="outlined" component="span">
                        {t("UPLOAD PHOTO")}
                      </Button>
                      {selectedImageName && (
                        <Typography
                          color="yellowgreen"
                          variant="subtitle1"
                          ml={1}
                        >
                          {selectedImageName}
                        </Typography>
                      )}
                    </Grid>
                  </label>
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("ADD BUSINESS")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBusiness;
