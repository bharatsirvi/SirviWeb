import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper
} from "@mui/material";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import { startTransition, useEffect, useState } from "react";
import axios from "axios";
import { businessDataSliceAction } from "../store/businessSlice";
dayjs.extend(utc);
dayjs.extend(timezone);

const EditBusinessContainer = ({ open, handleClose, business }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(
    (business && business.image) || null
  );
  const [isImageChange, setIsImageChange] = useState(false);
  useEffect(() => {
    setSelectedImage((business && business.image) || null);
    setIsImageChange(false);
    reset(business);
  }, [business, open]);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  // const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "owner_names"
  });
  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const handleFileInputChange = (files, field) => {
    startTransition(() => {
      field.onChange(files[0]);
    });
  };

  const onSubmit = async (data) => {
    const businessImage = data.image;
    const businessId = data._id;
    data.added_by = userId;
    delete data.image;
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/business/${businessId}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((dataResponse) => {
        console.log("dataResponse", dataResponse.data);
        if (isImageChange) {
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
                  dataResponse.data.image = reader.result;
                  console.log("ready to dispatch", dataResponse.data);
                  dispatch(
                    businessDataSliceAction.updateBusiness(dataResponse.data)
                  );
                } else {
                  console.error("Failed to update profile picture");
                }

                handleClose();
              });
          };
          reader.readAsDataURL(businessImage);
        } else {
          console.log("ready to dispatch", dataResponse.data);
          if (businessImage !== null) {
            dataResponse.data.image = businessImage;
            dispatch(businessDataSliceAction.updateBusiness(dataResponse.data));
            handleClose();
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  // Add your edit functionality here
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {t("Edit Business")}
      </DialogTitle>
      <DialogContent>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 1
            }}
          >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                  <Grid container spacing={2}>
                    {fields.map((item, index) => (
                      <Grid item xs={10} sm={6} key={item.id}>
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
                              size="small"
                              error={!!errors.owner_names?.[index]}
                              helperText={errors.owner_names?.[index]?.message}
                            />
                          )}
                        />
                        <Button
                          sx={{ color: "red" }}
                          onClick={() => remove(index)}
                        >
                          {t("Remove")}
                        </Button>
                      </Grid>
                    ))}
                    <Grid item xs={10} md={4}>
                      <Button
                        sx={{ color: "green" }}
                        onClick={() => append("")}
                      >
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
                        size="small"
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
                        size="small"
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
                            setSelectedImage(
                              URL.createObjectURL(e.target.files[0])
                            );
                            setIsImageChange(true);
                            handleFileInputChange(e.target.files, field);
                          }}
                        />
                        <Grid container alignItems="center">
                          {selectedImage ? (
                            <>
                              <img
                                src={selectedImage}
                                alt="Business"
                                style={{ maxHeight: 100, marginRight: 10 }}
                              />
                              <Button
                                size="small"
                                color="primary"
                                component="span"
                                // onClick={() => onEdit(business)}
                                startIcon={<EditIcon />}
                              >
                                {t("UPDATE PHOTO")}
                              </Button>
                            </>
                          ) : (
                            <Button variant="outlined" component="span">
                              {t("UPLOAD PHOTO")}
                            </Button>
                          )}
                        </Grid>
                      </label>
                    )}
                  />
                </Grid>
                <DialogActions
                  sx={{ position: "absolute", bottom: 0, right: 10 }}
                >
                  <Button onClick={handleClose} color="primary">
                    {t("Cancel")}
                  </Button>
                  <Button type="submit" color="success">
                    {t("Save")}
                  </Button>
                </DialogActions>
              </Grid>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default EditBusinessContainer;
