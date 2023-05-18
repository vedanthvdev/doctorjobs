import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ipAddress } from "../../address";
import zxcvbn from "zxcvbn";
import PasswordEye from "../login/passwordEye";

function SignUp() {
  let navigate = useNavigate();
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setPassword] = useState("");
  const [regConfirmPassword, setConfirmPassword] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regDob, setRegDob] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState();

  function yearsAgo(years) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split("T")[0];
  }

  const maxDate = yearsAgo(16);
  const minDate = yearsAgo(100);

  const [error, setError] = useState("");

  const register = () => {
    axios
      .post(ipAddress + "/api/signup", {
        firstname: regFirstName,
        lastname: regLastName,
        email: regEmail,
        password: regPassword,
        gender: regGender,
        dob: regDob,
      })
      .then((response) => {
        console.log(response);
      });
  };

  function removeError() {
    setTimeout(() => {
      setError("");
    }, 2000);
  }

  function checkUserAlreadyRegistered(e) {
    e.preventDefault();
    setSpinner(true);
    axios
      .post(ipAddress + "/api/emailalreadyregistered", {
        email: regEmail,
      })
      .then((response) => {
        if (response.data.message) {
          setError("Email already exists...");
          removeError();
        } else {
          setError("");
          handleValidation();
        }
        setSpinner(false);
      });
  }

  function handleValidation() {
    if (regPassword !== regConfirmPassword || regConfirmPassword === "") {
      setError("Passwords don't match");
      removeError();
    } else {
      setError("");
      register();
      navigate("/login");
    }
  }

  return (
    <div className="signup-body">
      <form
        data-testid="signup-form"
        className="signup-container"
        onSubmit={checkUserAlreadyRegistered}
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
            placeholder="First Name*"
            style={{ display: "inline-block", width: "50%" }}
          />
          <span className="icon">
            <i className="fa-solid fa-user-doctor"></i>
          </span>
          <input
            type="text"
            id="last-name"
            name="last-name*"
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
            placeholder="Email*"
          />
        </label>
        <br />

        <label className="label-text-signup" id="gender">
          <span className="icon">
            <i className="fa-solid fa-person"></i>
          </span>
          <label id="gender_male">
            Male
            <input
              type="radio"
              id="gender-male"
              name="gender"
              data-testid="gender-male"
              onClick={() => {
                setRegGender("Male");
              }}
              required
            />
          </label>

          <span className="icon">
            <i className="fa-solid fa-person-dress"></i>
          </span>
          <label id="gender_female">
            Female
            <input
              type="radio"
              name="gender"
              id="gender-female"
              data-testid="gender-female"
              onClick={() => {
                setRegGender("Female");
              }}
              required
            />
          </label>

          <span className="icon">
            <i className="fa-solid fa-people-arrows"></i>
          </span>
          <label id="gender_other">
            Other
            <input
              type="radio"
              id="gender-other"
              name="gender"
              data-testid="gender-other"
              onClick={() => {
                setRegGender("Other");
              }}
              required
            />
          </label>
        </label>
        <br />

        {/* --------------------date---------------------------- */}
        <label className="label-text-signup" id="dob-input">
          <span className="icon">
            <i className="fa-solid fa-calendar-days"></i>{" "}
          </span>
          <input
            type="date"
            id="dob"
            name="birthdate"
            min={minDate}
            max={maxDate}
            required
            placeholder="Date Of Birth*"
            onChange={(e) => {
              setRegDob(e.target.value);
            }}
            style={{ display: "inline-block", width: "100%" }}
          />
        </label>
        <br />

        <label className="label-text-signup" id="pass">
          <span className="icon">
            <i className="fa fa-lock"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            data-testid="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              const timeToHack = zxcvbn(e.target.value).crack_times_display
                .online_no_throttling_10_per_second;
              setPasswordStrength(timeToHack);
            }}
            placeholder="Password*"
          />
          <PasswordEye
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </label>
        {regPassword && (
          <p className="timeToHack">
            💡 Time to hack: <span className="time">{passwordStrength}</span>
          </p>
        )}

        <br />

        <label className="label-text-signup" id="conPassword">
          <span className="icon">
            <i className="fa fa-lock"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            name="confirm-password"
            data-testid="confirm-password"
            required
            placeholder="Confirm Password*"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </label>

        <br />

        {error && <div className="errorValue">{error}</div>}

        <br />
        <button id="submit" type="submit" value="Submit">
          {spinner === true ? (
            <span className="spinner">
              <i className="fa-solid fa-spinner"></i>
            </span>
          ) : (
            <span>Submit</span>
          )}
        </button>
        <a href="/login" id="back-to-login">
          Back to login
        </a>
      </form>
    </div>
  );
}

export default SignUp;
