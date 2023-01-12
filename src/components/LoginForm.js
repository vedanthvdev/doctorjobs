import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ LoginUser, error, setError }) {
  //   let history = useNavigate();

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

  return (
    <div className="login">
      <div className={`${error ? "vibrate-error transparent-red-screen" : ""}`}>
        <form onSubmit={submitHandler}>
          <div className="App">
            <link rel="stylesheet" href="App.css"></link>
            <h3 type="company" id="company-header">
              Doctors Job
            </h3>

            <label class="label-text" for="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                required
                value={details.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label class="label-text" for="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                required
                value={details.password}
                onChange={handleChange}
              />
            </label>

            {/* {error !== "" ? <div className="errorValue">{error}</div> : ""} */}
            <br />
            <input type="submit" value="Log In" id="submit" />
          </div>
          <div id="forgot-password-container">
            <a href="#" id="forgot-password">
              Forgotten Password
            </a>
          </div>
          <a href="#" id="signup-link">
            Sign Up
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
