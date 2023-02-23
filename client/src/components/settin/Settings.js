import React, { useEffect, useState } from "react";
import NavBar from "../navigationBar/NavBar";
import axios from "axios";
import { ipAddress } from "../../address";

function Settings() {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .post(ipAddress + "/api/getuser", {
        id: window.localStorage.getItem("userId"),
      })
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="signup-body">
      <link rel="stylesheet" href="profile.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>
      {<NavBar />}
      <h1 id="welcomeUser">Welcome, {user.u_lastname}</h1>

      <a
        href="/login"
        id="logout"
        onClick={() => {
          window.localStorage.removeItem("isLoggedIn");
          window.localStorage.removeItem("userId");
          document.getElementById("signInDIv").hidden = false;
        }}
      >
        Log Out
      </a>
      <br />

      <h1>Toggle here</h1>
    </div>
  );
}

export default Settings;
