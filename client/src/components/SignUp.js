import React, { useState } from "react";
import Axios from "axios";

function SignUp() {
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setPassword] = useState("");

  const register = () => {
    Axios.post("http://localhost:3000/signup", {
      firstname: regFirstName,
      lastname: regLastName,
      email: regEmail,
      password: regPassword,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <form className="signup-container">
      <link rel="stylesheet" href="signup.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>
      <h3>Sign Up</h3>
      <label className="label-text-signup" id="fname"></label>
      <span className="icon">
        <i class="fa-solid fa-user-doctor"></i>
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
      />
      <br />

      <label className="label-text-signup" id="lname"></label>
      <span className="icon">
        <i class="fa-solid fa-user-doctor"></i>
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
      />
      <br />

      <label className="label-text-signup" id="emailiD"></label>
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
      <br />

      <label className="label-text-signup" id="pass"></label>
      <span className="icon">
        <i className="fa fa-lock"></i>
      </span>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <br />

      <label className="label-text-signup" id="conPassword"></label>
      <span className="icon">
        <i className="fa fa-lock"></i>
      </span>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
        placeholder="Confirm Password"
      />
      <br />
      <input id="submit" type="submit" value="Submit" onClick={register} />
    </form>
  );
}

export default SignUp;
