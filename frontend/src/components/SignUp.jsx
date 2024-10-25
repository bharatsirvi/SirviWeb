import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "../utills/firebaseConfig";
import OtpDialog from "./OtpDialog";

function SignUp() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({ defaultValues: { name: "", mobile: "", password: "" } });
  const [authStart, setAuthStart] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [confirmation, setConfirmation] = useState(null);
  const [otpVerifyDone, setotpVerifyDone] = useState(false);

  useEffect(() => {
    setOtpSent(false);
    setMobileNumber("");
  }, []);

  const sendOtp = (mobile) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {}
        }
      );
    }
    const phoneNumber = `+91${mobile}`; //
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmation) => {
        setConfirmation(confirmation);
        enqueueSnackbar("OTP sent successfully.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        setOtpSent(true);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("OTP sent Failed", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
      });
  };

  // const cleanupRecaptcha = () => {
  //   if (window.recaptchaVerifier) {
  //     window.recaptchaVerifier.clear();
  //     window.recaptchaVerifier = null;
  //   }
  // };
  const onSubmit = (data) => {
    setAuthStart(true);
    axios
      .post("http://localhost:8080/auth/signup", data)
      .then((response) => {
        console.log("signup data submit response", response);
        enqueueSnackbar("SignUp Successfully Done.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        navigate("/login");
        setAuthStart(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        setAuthStart(false);
      });
  };

  const handleClickonResendOtp = () => {
    sendOtp(mobileNumber);
  };
  const handleClickonSendOtp = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      setError("mobile", {
        type: "manual",
        message: "Please enter a 10-digit number"
      });
    } else {
      clearErrors("mobile");
      sendOtp(mobileNumber);
    }
  };
  const handleCloseDialog = () => {
    setOtpSent(false);
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-heading">Create New Account</h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-section">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              type="text"
              placeholder="Your Name"
              className="input-field"
              disabled={otpSent}
            />
            {errors.name ? (
              <p className="error-message">{errors.name.message}</p>
            ) : (
              <p className="error-message"></p>
            )}
          </div>

          <div className="input-section">
            <label htmlFor="mobile">Mobile Number</label>

            <input
              {...register("mobile", {
                required: "Mobile no is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile no must be 10 digits long"
                }
              })}
              id="mobile"
              type="tel"
              placeholder="Mobile Number"
              className="input-field"
              onChange={(e) => {
                setotpVerifyDone(false);
                setMobileNumber(e.target.value);
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              {errors.mobile ? (
                <p className="error-message">{errors.mobile.message}</p>
              ) : (
                <p className="error-message"></p>
              )}
              {otpVerifyDone ? (
                <Typography color="green" variant="subtitle1">
                  Verified
                </Typography>
              ) : (
                <Button
                  sx={{ wordBreak: "keep-all" }}
                  onClick={handleClickonSendOtp}
                >
                  Send Otp
                </Button>
              )}
            </div>
          </div>
          <div id="recaptcha-container"></div>
          <div className="input-section">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters"
                }
              })}
              aria-invalid={errors.password ? "true" : "false"}
              id="password"
              type="password"
              placeholder="Password"
              className="input-field"
              disabled={otpSent}
            />
            {errors.password ? (
              <p className="error-message">{errors.password.message}</p>
            ) : (
              <p className="error-message"></p>
            )}
          </div>

          {authStart ? (
            <Box sx={{ display: "flex" }} alignItems={"center"} gap={"20px"}>
              <Button
                sx={{ marginBottom: "5px" }}
                color="primary"
                type="submit"
                disabled
                variant="contained"
              >
                Sign Up
              </Button>
              <CircularProgress size="30px" />
            </Box>
          ) : (
            <Button
              sx={{ marginBottom: "5px" }}
              color="primary"
              type="submit"
              variant="contained"
              // disabled={!otpVerifyDone}
            >
              Sign Up
            </Button>
          )}
        </form>

        <div style={{ color: "black", marginTop: "20px" }}>
          I already have an account. <Link to="/login">Log in</Link>
        </div>
      </div>
      <OtpDialog
        open={otpSent}
        handleClose={handleCloseDialog}
        confirmationResult={confirmation}
        setotpVerifyDone={setotpVerifyDone}
        handleResendOtp={handleClickonResendOtp}
      />
    </>
  );
}

export default SignUp;
