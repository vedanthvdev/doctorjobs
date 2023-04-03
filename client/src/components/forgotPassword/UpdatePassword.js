import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ipAddress } from "../../address";
import zxcvbn from "zxcvbn";
import PasswordEye from "../login/passwordEye";

function UpdatePassword() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState();
  const [spinner, setSpinner] = useState(false);

  const updatepassword = () => {
    setSpinner(true);
    axios
      .post(ipAddress + "/api/updatepassword", {
        id: window.localStorage.getItem("userId"),
        password: password,
      })
      .then((response) => {
        if (response.data.message === "Something went wrong") {
          setError("Something went wrong please try again later");
        } else {
          setSuccess("Password successfully changed");
          window.localStorage.removeItem("userId");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        setSpinner(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      setError("Passwords don't match");
    } else if (password === "" || confirmPassword === "") {
      setError("Passwords field cannot be empty");
    } else {
      setError("");
      updatepassword();
    }
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <div className="update-password-body">
      <form className="update-password-container" onSubmit={handleSubmit}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        ></link>
        <link rel="stylesheet" href="App.css"></link>
        <link rel="stylesheet" href="password.css"></link>

        <h3>Update Password</h3>
        <label>
          <span className="icon">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              const timeToHack = zxcvbn(e.target.value).crack_times_display
                .online_no_throttling_10_per_second;
              setPasswordStrength(timeToHack);
            }}
            required
          />
          <PasswordEye
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </label>
        {password && (
          <p className="timeToHack">
            💡 Time to hack: <span className="time">{passwordStrength}</span>
          </p>
        )}

        <label>
          <span className="icon">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
        <br />
        {error !== "" ? <div className="errorValue">{error}</div> : ""}
        {success !== "" ? <div className="successValue">{success}</div> : ""}
        <br />
        <button data-testid="submit" type="submit" value="Submit" id="submit">
          {spinner === true ? (
            <span className="spinner">
              <i className="fa-solid fa-spinner"></i>
            </span>
          ) : (
            <span>Submit</span>
          )}
        </button>
        <br />
        <a href="/login" id="back-to-login">
          Back to login
        </a>
      </form>
    </div>
  );
}

export default UpdatePassword;
