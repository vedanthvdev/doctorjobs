import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setPassword] = useState("");
  const [regConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3000/api/signup", {
        firstname: regFirstName,
        lastname: regLastName,
        email: regEmail,
        password: regPassword,
      })
      .then((response) => {
        console.log(response);
      });
  };

  function handleValidation() {
    if (regPassword !== regConfirmPassword || regConfirmPassword === "") {
      setError("Passwords don't match");
    }
    if (error === "") {
      register();
      navigate("/login");
      setError("");
    }
  }

  return (
    <div className="signup-body">
      <form
        data-testid="signup-form"
        className="signup-container"
        onSubmit={handleValidation}
      >
        <link rel="stylesheet" href="signup.css"></link>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        ></link>
        <h3>Sign Up</h3>
        <label type="signup" id="name">
          <span className="icon">
            <i className="fa-solid fa-user-doctor"></i>
          </span>
          <input
            type="text"
            id="first-name"
            name="first-name"
            onChange={(e) => {
              setRegFirstName(e.target.value);
            }}
            required
            placeholder="First Name"
            style={{ display: "inline-block", width: "50%" }}
          />
          <span className="icon">
            <i className="fa-solid fa-user-doctor"></i>
          </span>
          <input
            type="text"
            id="last-name"
            name="last-name"
            required
            onChange={(e) => {
              setRegLastName(e.target.value);
            }}
            placeholder="Last Name"
            style={{ display: "inline-block", width: "50%" }}
          />
        </label>
        <br />

        <label type="signup" className="label-text-signup" id="emailiD">
          <span className="icon">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => {
              setRegEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </label>
        <br />

        <label className="label-text-signup" id="pass">
          <span className="icon">
            <i className="fa fa-lock"></i>
          </span>
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </label>
        <br />

        <label className="label-text-signup" id="conPassword">
          <span className="icon">
            <i className="fa fa-lock"></i>
          </span>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            data-testid="confirm-password"
            required
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </label>
        <br />
        {error === "" ? "" : <div className="errorValue">{error}</div>}

        <br />
        <input id="submit" type="submit" value="Submit" />
        <a href="sd" id="back-to-login" onClick={() => navigate("/login")}>
          Back to login
        </a>
      </form>
    </div>
  );
}

export default SignUp;
