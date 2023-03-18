import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ipAddress } from "../../address";

function ForgotPassword() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(ipAddress + "/api/forgotpassword", {
        email: email,
      })
      .then((response) => {
        if (response.data.message === "Email not found") {
          setError("No account with this email exists");
        } else {
          setError("");
          setSuccess("An email has been sent to your address");
          window.localStorage.setItem("userId", response.data[0].u_id);
          setTimeout(() => {
            setError("");
            setSuccess("");
          }, 1000);
          setTimeout(() => {
            navigate("/updatepassword");
          }, 1000);
        }
      });
  };

  return (
    <form className="forgot-password-container" onSubmit={handleSubmit}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>
      <link rel="stylesheet" href="App.css"></link>
      <h3>Forgot Password</h3>
      <label>
        <span className="icon">
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <br />
      {error !== "" ? <div className="errorValue">{error}</div> : ""}
      {success !== "" ? <div className="successValue">{success}</div> : ""}
      <br />
      <button
        data-testid="forgot-submit"
        type="submit"
        value="Submit"
        id="forgot-submit"
      >
        Submit
      </button>
      <br />
      <a href="/login" id="back-to-login">
        Back to login
      </a>
    </form>
  );
}

export default ForgotPassword;
