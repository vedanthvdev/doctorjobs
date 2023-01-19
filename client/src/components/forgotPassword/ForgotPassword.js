import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/forgotpassword", {
        email: email,
      })
      .then((response) => {
        if (response.data.message === "Email not found") {
          setError("No account with this email exists");
        } else {
          setError("");
          setSuccess("An email has been sent to your address");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      });
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
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
        {error !== "" ? <div className="error-message">{error}</div> : ""}
        {success !== "" ? <div className="success-message">{success}</div> : ""}
        <br />
        <input
          data-testid="forgot-submit"
          type="submit"
          value="Submit"
          id="forgot-submit"
        />{" "}
        <br />
        <a href="#" id="back-to-login" onClick={() => navigate("/login")}>
          Back to login
        </a>
      </form>
    </div>
  );
}

export default ForgotPassword;
