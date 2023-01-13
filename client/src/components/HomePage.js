import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Routes, Route } from "react-router-dom";

function HomePage({ user }) {
  // const [details, setDetails] = useState({email:"", password:""})

  // const clickLogout = e => {
  //     e.preventDefault();
  //     Logout(details);
  // // }
  // if(!authorized){
  //     return <Navigate to="/login" />
  //     console.log("eiybfiec");
  // }
  return (
    <div className="profile">
      <h1>Welcome, {user.email}</h1>
      <link rel="stylesheet" href="App.css"></link>

      <link
        rel="stylesheet"
        href="fontawesome-free-6.2.1-web/css/fontawesome.min.css"
      ></link>
      <span className="icon">
        <i className="fa fa-lock"></i>
      </span>
      <p>Your profile details:</p>
      <ul>
        <li>Email: {user.email}</li>
        <li>Password: ******</li>
      </ul>
    </div>
  );
}

export default HomePage;
