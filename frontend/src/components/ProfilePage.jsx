import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const userDetails = useSelector((state) => state.userData.userInfo);
  const { t } = useTranslation();
  //// datestring conversion to dd/mm/yyyy
  var dob = userDetails.dob;

  if (userDetails.dob == "" || userDetails.dob == null) {
    dob = "";
  } else {
    const date = new Date(userDetails.dob);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    dob = `${day}/${month}/${year}`;
    //// datestring conversion to dd/mm/yyyy
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 3,
        borderColor: "#b28704"
      }}
    >
      <Card
        elevation={5}
        sx={{
          width: { md: "90%", xs: "80%" },
          maxWidth: 800,
          padding: 3,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row-reverse", xs: "column" },
              justifyContent: "space-around",

              alignItems: "center"
            }}
          >
            <Paper
              sx={{
                width: 150,
                height: 150,
                marginBottom: 3,
                borderRadius: "50%"
              }}
              elevation={6}
            >
              <Avatar
                variant="circular"
                alt={userDetails.name}
                src={userDetails.profile_pic}
                sx={{
                  width: 150,
                  height: 150,
                  marginBottom: 3
                  // border: "4px solid #b28704"
                }}
              />
            </Paper>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {userDetails.name || ""}
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={10} md={6}>
              <Typography variant="h6">{t("Father's Name")}</Typography>
              <Typography variant="body1">
                {userDetails.father_name || ""}
              </Typography>
            </Grid>
            <Grid item xs={10} md={6}>
              <Typography variant="h6">{t("Date Of Birth")}</Typography>
              <Typography variant="body1">{dob || ""}</Typography>
            </Grid>
            <Grid item xs={10} md={6}>
              <Typography variant="h6">{t("Mobile Number")}</Typography>
              <Typography variant="body1">
                {userDetails.mobile || ""}
              </Typography>
            </Grid>
            <Grid item xs={10} md={6}>
              <Typography variant="h6">{t("Email")}</Typography>
              <Typography variant="body1">{userDetails.email || ""}</Typography>
            </Grid>
            <Grid item xs={10} md={6}>
              <Typography variant="h6">{t("Gotra")}</Typography>
              <Typography variant="body1">
                {t(userDetails.gotra) || ""}
              </Typography>
            </Grid>
            <Grid item xs={10} md={6}>
              <Typography variant="h6">{t("Gender")}</Typography>
              <Typography variant="body1">
                {t(userDetails.gender) || ""}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
