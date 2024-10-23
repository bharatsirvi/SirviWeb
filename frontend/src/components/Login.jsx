import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: { mobile: "", password: "" }
  });

  const [authStart, setAuthStart] = useState(false);

  // const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    setAuthStart(true);
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((response) => {
        console.log(
          "...............................................",
          response
        );
        enqueueSnackbar("Log In Successfully Done .", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        const user_id = response.data.userId;
        const token = response.data.token;
        console.log(
          "......................user_id ........................",
          user_id,
          "......................token ........................",
          token
        );

        localStorage.setItem("userId", user_id);
        localStorage.setItem("token", token);
        navigate(`/sirviApp`);
        setAuthStart(false);
      })
      .catch((err) => {
        console.log("....................ERROR....................", err);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        setAuthStart(false);
        console.log("....................ERROR....................", err);
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Please Log In</h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className={`input-section ${errors.mobile ? "error" : ""}`}>
          <label htmlFor="mobile">Mobile Number</label>
          <input
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits long"
              }
            })}
            id="mobile"
            type="tel"
            placeholder="Mobile Number"
            className="input-field"
          />
          <p className="error-message">
            {errors.mobile ? errors.mobile.message : " "}
          </p>
        </div>

        <div className={`input-section ${errors.password ? "error" : ""}`}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters"
              }
            })}
            id="password"
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <p className="error-message">
            {" "}
            {errors.password ? errors.password.message : null}{" "}
          </p>
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
              Log In
            </Button>
            <CircularProgress size="30px" />
          </Box>
        ) : (
          <Button
            sx={{ marginBottom: "5px" }}
            color="primary"
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
        )}
      </form>
      <div style={{ color: "black", marginTop: "20px" }}>
        Does not have an account? <Link to="/signup">Create new account</Link>
      </div>
    </div>
  );
}

export default Login;
