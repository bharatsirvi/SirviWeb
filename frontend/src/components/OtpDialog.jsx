// import { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
  // TextField,
  Button,
  Typography,
  FormHelperText,
  Box
  // Grid
} from "@mui/material";
import { useSnackbar } from "notistack";
// import OtpInput from "react-otp-input";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
const OtpDialog = ({
  open,
  handleClose,
  confirmationResult,
  setotpVerifyDone,
  handleResendOtp
}) => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      otp: ""
    }
  });
  useEffect(() => {
    reset({ otp: "" });
  }, []);
  // const [otp, setOtp] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const otpValue = watch("otp");
  // const refs = useRef(Array.from({ length: 6 }, () => null));

  const handleVerify = (otp) => {
    // const enteredOtp = otp.join("");
    // console.log("Entered OTP:", enteredOtp);
    console.log("confirmationResult", confirmationResult);
    confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log(result);
        enqueueSnackbar("OTP Verified", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        setotpVerifyDone(true);
        handleClose();
      })
      .catch((error) => {
        // const err = "invaild otp";
        // setErrorMsg(err);
        console.log("invaild otp");
        console.log(error);
      });
  };
  const onSubmit = (data) => {
    console.log(data);
    handleVerify(data.otp);
  };

  // const handleKeyDown = (event, index) => {
  //   const key = event.key;
  //   const isDigit = /^\d$/.test(key);

  //   if (isDigit) {
  //     const newOtp = [...otp];
  //     newOtp[index] = key;
  //     setOtp(newOtp);
  //     if (index < 5) {
  //       refs.current[index + 1].focus();
  //     }
  //   } else if (key === "Backspace" && index > 0 && !otp[index]) {
  //     const newOtp = [...otp];
  //     newOtp[index - 1] = "";
  //     setOtp(newOtp);
  //     refs.current[index - 1].focus();
  //   }
  // };
  return (
    // <Dialog open={open}>
    //   <DialogTitle>OTP Verification</DialogTitle>
    //   <DialogContent>
    //     <Typography>Please enter the OTP sent to your phone.</Typography>
    //     <Grid mt={2} container spacing={0.5} justifyContent="center">
    //       {otp.map((digit, index) => (
    //         <Grid xs={2} md={1} item key={index}>
    //           <TextField
    //             inputRef={refs[index]}
    //             margin="dense"
    //             type="text"
    //             variant="outlined"
    //             size="small"
    //             inputProps={{
    //               maxLength: 1,
    //               style: {
    //                 textAlign: "center",
    //                 fontSize: "1.5rem",
    //                 fontWeight: "bold"
    //               }
    //             }}
    //             value={digit}
    //             onChange={(e) => {
    //               const newOtp = [...otp];
    //               newOtp[index] = e.target.value;
    //               setOtp(newOtp);
    //             }}
    //             onKeyDown={(e) => handleKeyDown(e, index)}
    //           />
    //         </Grid>
    //       ))}
    //     </Grid>
    //     {errorMsg && (
    //       <Typography color="error" variant="subtitle2" align="center">
    //         {errorMsg}
    //       </Typography>
    //     )}
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={handleClose}>Cancel</Button>
    //     <Button
    //       onClick={handleVerify}
    //       color="primary"
    //       variant="contained"
    //       disabled={otp.some((digit) => !digit)}
    //     >
    //       Verify
    //     </Button>
    //   </DialogActions>
    // </Dialog>

    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>OTP Verification</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" mb={1}>
          Please enter the OTP sent to phone.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Controller
            name="otp"
            control={control}
            rules={{ validate: (value) => value.length === 6 }}
            render={({ field, fieldState }) => (
              <Box>
                <MuiOtpInput
                  TextFieldsProps={{
                    placeholder: "-",
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    onInput: (e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }
                  }}
                  sx={{
                    gap: 1
                  }}
                  {...field}
                  autoFocus
                  length={6}
                />
                {fieldState.invalid ? (
                  <FormHelperText variant="standard" error>
                    Invalid OTP
                  </FormHelperText>
                ) : null}
              </Box>
            )}
          />
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)}
            >
              verify OTP
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
          <Box mt={2}>
            <Typography variant="caption" color="grey">
              if you did not receive a code.{" "}
              <span
                onClick={() => handleResendOtp()}
                style={{ color: "red", cursor: "pointer" }}
              >
                Resend
              </span>
            </Typography>
          </Box>
        </Box>
        {/* <TextField
          autoFocus
          margin="dense"
          id="otp"
          label="Enter OTP"
          type="password"
          fullWidth
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={!!errorMsg}
          helperText={errorMsg}
        /> */}
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
