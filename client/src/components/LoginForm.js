import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginForm({ LoginUser, error, setError }) {
  let navigate = useNavigate();

  const [details, setDetails] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    LoginUser(details);
    setTimeout(() => {
      setError("");
    }, 500);
  };

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

  const loginValidation = () => {
    // navigate("/profile");
  };

  return (
    <div className="login">
      <div className={`${error ? "vibrate-error transparent-red-screen" : ""}`}>
        <form onSubmit={submitHandler}>
          <div className="App">
            <link rel="stylesheet" href="App.css"></link>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            ></link>
            <h3 type="company" id="company-header">
              Doctors Job
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
                placeholder="Email"
              />
            </label>
            <br />
            <label className="label-text">
              <span className="icon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={details.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </label>
            {/* {error !== "" ? <div className="errorValue">{error}</div> : ""} */}
            <br />
            <input
              type="submit"
              value="Log In"
              id="submit"
              onClick={() => loginValidation()}
            />
          </div>
          <div id="forgot-password-container">
            <a href="#" id="forgot-password">
              Forgotten Password
            </a>
          </div>
          <a href="#" id="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
