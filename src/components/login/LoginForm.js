import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { ipAddress } from "../../address";
import PasswordEye from "./passwordEye";

function LoginForm() {
  let navigate = useNavigate();

  const [error, setError] = useState();
  const [spinner, setSpinner] = useState(false);

  const [details, setDetails] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  function facebookLogin(response) {
    checkUserAlreadyRegistered(response);
  }

  function checkUserAlreadyRegistered(fresponse) {
    axios
      .post(ipAddress + "/api/emailalreadyregistered", {
        email: fresponse.email,
      })
      .then((response) => {
        if (!response.data.message) {
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("userId", response.data[0].u_id);
          loginSuccess();
        } else {
          // Ask facebook for more information for dob and
          signUpUserFb(fresponse);
        }
      });
  }

  //sign up using facebook
  function signUpUserFb(response) {
    axios
      .post(ipAddress + "/api/signup", {
        firstname: response.first_name,
        lastname: response.last_name,
        email: response.email,
        // password: "facebookpas",
        // gender: regGender,
        // dob: regDob,
      })
      .then((response) => {
        console.log(response);
        facebookLogin(response);
      });
  }

  const LoginUser = (details) => {
    axios
      .post(ipAddress + "/api/authenticate", {
        email: details.email,
        password: details.password,
      })
      .then((response) => {
        if (!response.data.message) {
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("userId", response.data[0].u_id);
          loginSuccess();
        } else {
          console.log("The details don't match");
          setError("The details don't match");
        }
        setSpinner(false);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSpinner(true);
    LoginUser(details);
    setTimeout(() => {
      setError("");
    }, 500);
  };

  function loginSuccess() {
    setError("");
    navigate("/profile");
  }

  useEffect(() => {
    if (error === "Invalid login details" || error === "vibrate-error") {
      document.documentElement.style.setProperty(
        "--error-color",
        "rgba(255,0,0,0.2)"
      );
      setTimeout(() => {
        document.documentElement.style.setProperty(
          "--error-color",
          "rgba(255,0,0,0)"
        );
      }, 3000);
    }
  }, [error]);

  return (
    <div className="login">
      <div className={`${error ? "vibrate-error transparent-red-screen" : ""}`}>
        <form onSubmit={submitHandler}>
          <div className="login-app">
            <link rel="stylesheet" href="App.css"></link>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            ></link>
            <h3 type="company" id="company-header">
              Hospital Jobs
            </h3>

            <label className="label-text">
              <span className="icon">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={details.email}
                onChange={handleChange}
                placeholder="Email*"
                data-testid="email"
              />
            </label>
            <br />
            <label className="label-text">
              <span className="icon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={details.password}
                onChange={handleChange}
                placeholder="Password*"
                data-testid="password"
              />
              <PasswordEye
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </label>
            <br />
            <button
              data-testid="submit"
              type="submit"
              value="Log In"
              id="submit"
            >
              {spinner === true ? (
                <span className="spinner">
                  <i className="fa-solid fa-spinner"></i>
                </span>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </div>
          <div id="forgot-password-container">
            <a href="/forgotpassword" id="forgot-password">
              Forgotten Password
            </a>
          </div>
          <a href="/home" id="login-link">
            Home
          </a>
          <br />
          <a href="/signup" id="signup-link">
            Sign Up
          </a>
          <br />
          <LoginSocialFacebook
            appId="686903669782616"
            autoLoad={true}
            onResolve={(response) => {
              console.log(response);
              facebookLogin(response.data);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </form>
      </div>
      <div id="signInDIv"></div>
    </div>
  );
}

export default LoginForm;
