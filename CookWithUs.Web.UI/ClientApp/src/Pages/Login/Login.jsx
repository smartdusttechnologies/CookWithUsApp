import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const loginurl = "api/security/login";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth, notification, setNotification } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(loginurl, {
        userName: email,
        password: password,
      })
      .then((response) => {
        const isAuthenticated = response?.data?.isSuccessful;

        // For Success
        if (isAuthenticated) {
          const accessToken = response?.data?.requestedObject?.accessToken;
          const userName = response?.data?.requestedObject?.userName;
          const userId = response?.data?.requestedObject?.userId;
          const roleId = response?.data?.requestedObject?.roleId;
          setAuth({ roleId, accessToken, userName, userId, isAuthenticated });

          const messages = response?.data?.message;

          if (messages && messages.length > 0) {
            const newNotifications = [];
            for (let i = 0; i < messages.length; i++) {
              if (i < 3) {
                toast.success(messages[i].reason, {
                  position: "bottom-center",
                  theme: "colored",
                });
              }
              newNotifications.push({
                message: messages[i].reason,
                success: true,
              });
            }
            setNotification([...notification, ...newNotifications]);
          }

          setTimeout(() => {
            navigate("/");
          }, 1000);
          setLoading(false);
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        setLoading(false);
        const isAuthenticated = error?.response?.data?.isSuccessful;

        // For Error
        if (!isAuthenticated) {
          const messages = error?.response?.data?.message;

          if (messages && messages.length > 0) {
            const newNotifications = [];
            for (let i = 0; i < messages.length; i++) {
              if (i < 3) {
                toast.error(messages[i].reason, {
                  position: "bottom-center",
                  theme: "colored",
                });
              }
              newNotifications.push({
                message: messages[i].reason,
                success: false,
              });
            }
            setNotification([...notification, ...newNotifications]);
          }
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-text-div">
            <Link style={{ textDecoration: "none", color: "blue" }}>
              <p className="text-login">Sign in</p>
            </Link>
          </div>
          <div>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <p style={{ fontSize: "23px", color: "rgb(62, 61, 61)" }}>
                Sign up
              </p>
            </Link>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} action="">
          <TextField
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            label="Username or Email ID"
            type="text"
            value={email}
            required
          />
          <TextField
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            value={password}
            required
          />
          <div className="remeber-me-forgot-pass">
            <div>
              {" "}
              <label htmlFor="">Remember me</label> <input type="checkbox" />
            </div>
            <Link to={"/forgotpassword"} className="forgot-pass">
              Forgot password
            </Link>
          </div>
          <Button
            type="submit"
            color="success"
            // loading={isLoading}
          >
            Sign in
          </Button>
        </form>

        <div className="Or-div">
          <div>
            <hr />
          </div>
          <div>
            <p>or</p>
          </div>
          <div>
            <hr />
          </div>
        </div>

        <div className="social-media-login">
          <a className="Twitter blue-login" href="">
            <p>Twitter</p>
          </a>
          <a className="Facebook blue-login" href="">
            <p>Facebook</p>
          </a>
          <a className="Google red-login" href="">
            <p>Google</p>
          </a>
          <a className="Linked-In blue-login" href="">
            <p>Linked-In</p>
          </a>
        </div>
        <div className="sign-up">
          <Link to={"/signup"}>Don't have an account? Sign Up</Link>
        </div>
        <div className="why-box">
          <p className="why">Why Create an Account?</p>
          <div>
            <p className="ans">
              By creating the account you agreed to our
              <a>Privacy Policy</a>&<a>Cookie Policy</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
