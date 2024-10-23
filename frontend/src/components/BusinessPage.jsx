// import { useDispatch } from "react-redux";
// import { businessDataSliceAction } from "../store/businessSlice";

import {
  Box,
  Button,
  CardActions,
  Container,
  Divider,
  Grid
} from "@mui/material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import EditBusinessContainer from "./EditBusinessContainer";
import { useTranslation } from "react-i18next";
import { deleteBusiness, getAllBusinessAddByUser } from "../utills/business";
import { businessDataSliceAction } from "../store/businessSlice";
const BusinessCard = ({ business, onEdit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onDelete = (business) => {
    try {
      deleteBusiness(business._id);
    } catch (error) {
      console.log("Error", error);
    }
    dispatch(businessDataSliceAction.deleteBusiness(business._id));
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        boxShadow: 3,
        padding: 1,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)"
        },
        backgroundColor: "#eff3f7",
        position: "relative",
        wordWrap: "break-word",
        wordBreak: "break-word"
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          opacity: business.image ? 1 : 0.5,
          objectFit: business.image ? "cover" : "contain",
          padding: 1,
          borderRadius: 3
        }}
        title={business.name}
        image={business.image || "/images/no_photo.png"}
        alt={business.name}
      />
      <CardContent>
        <Typography
          sx={{ textTransform: "uppercase", mb: 1 }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {business.name}
          <Divider sx={{ opacity: 0.5, mb: 2 }} />
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
          <Typography
            sx={{ display: "flex", justifyContent: "space-between" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>{t("Location")} :</strong> {business.location}
          </Typography>
          <Typography
            sx={{ display: "flex", justifyContent: "space-between" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>{t("Category")} : </strong> {business.category}
          </Typography>
          <Typography
            sx={{ display: "flex", justifyContent: "space-between" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>{t("Mobile")} : </strong> {business.owner_mobile}
          </Typography>
          <Typography
            sx={{ display: "flex", justifyContent: "space-between" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>{t("Email")} : </strong> {business.owner_email}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            <strong>{t("Owners")} :</strong>
          </Typography>
          <Grid container spacing={1}>
            {business.owner_names.map((name, index) => (
              <Grid item xs={6} key={index}>
                <Typography variant="body2" color="text.secondary">
                  {name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between"
        }}
      >
        <Button
          size="medium"
          color="primary"
          onClick={() => onEdit(business)}
          startIcon={<EditIcon />}
        >
          {t("Edit")}
        </Button>
        <Button
          onClick={() => onDelete(business)}
          size="medium"
          color="error"
          startIcon={<DeleteIcon />}
        >
          {t("Delete")}
        </Button>
      </CardActions>
    </Card>
  );
};

function BusinessPage() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getAllBusinessAddByUserData = getAllBusinessAddByUser(userId);
    getAllBusinessAddByUserData
      .then((data) => {
        console.log("data", data);
        dispatch(businessDataSliceAction.AddAllBusinessOfuser(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const businessDetails = useSelector(
    (state) => state.businessData.businessInfo
  );

  console.log(
    "business Details Slice Data  ------------------->>>>>>>>",
    businessDetails
  );

  const [editOpen, setEditOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    setSelectedBusiness(null);
    setEditOpen(false);
  }, [businessDetails]);

  const handleEditOpen = (business) => {
    setSelectedBusiness(business);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {businessDetails.map((business) => (
          <Grid item key={business._id} xs={12} sm={10} md={5} lg={4}>
            <BusinessCard
              business={business}
              onEdit={() => handleEditOpen(business)}
            />
          </Grid>
        ))}
      </Grid>
      <EditBusinessContainer
        open={editOpen}
        handleClose={handleEditClose}
        business={selectedBusiness}
      />
    </Container>
  );
}
export default BusinessPage;
