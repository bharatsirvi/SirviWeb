import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function LoginAndSignup() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Navbar page="landingPage" />
      <div className="loginAndSignupBackground">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default LoginAndSignup;
