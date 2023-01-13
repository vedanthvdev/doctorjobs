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

      <h3>Sign Up</h3>
      <label id="fname">First Name:</label>
      <input
        type="text"
        id="first-name"
        name="first-name"
        onChange={(e) => {
          setRegFirstName(e.target.value);
        }}
        required
      />
      <br />

      <label id="lname">Last Name:</label>
      <input
        type="text"
        id="last-name"
        name="last-name"
        required
        onChange={(e) => {
          setRegLastName(e.target.value);
        }}
      />
      <br />

      <label id="emailiD">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={(e) => {
          setRegEmail(e.target.value);
        }}
      />
      <br />

      <label id="pass">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />

      <label id="conPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
      />
      <br />
      <input id="submit" type="submit" value="Sign Up" onClick={register} />
    </form>
  );
}

export default SignUp;
