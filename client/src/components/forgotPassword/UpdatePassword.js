import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ipAddress } from "../../address";

function UpdatePassword() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updatepassword = () => {
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
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <label>
          <span className="icon">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
          <input
            type="password"
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
          Submit
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
