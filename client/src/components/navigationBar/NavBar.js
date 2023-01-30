import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function NavBar() {
  const [activeLink, setActiveLink] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/profile") {
      setActiveLink(0);
    } else if (window.location.pathname === "/jobs") {
      setActiveLink(1);
    } else if (window.location.pathname === "/employer") {
      setActiveLink(2);
    } else if (window.location.pathname === "/viewmyjobs") {
      setActiveLink(3);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getuser", {
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
    <div className="navbar">
      <nav className="navigation-bar">
        <ul>
          <li className={activeLink === 0 ? "active" : ""}>
            <a href="/profile">
              <span className="nav-icon">
                <i className="fa-solid fa-house"></i>
              </span>
              <br />
              Home
            </a>
          </li>
          <li className={activeLink === 1 ? "active" : ""}>
            <a href="/jobs">
              <span className="nav-icon">
                <i className="fa-solid fa-suitcase"></i>
              </span>
              <br />
              Jobs
            </a>
          </li>
          <li className={activeLink === 2 ? "active" : ""}>
            <a href="/employer">
              <span className="nav-icon">
                <i className="fa-solid fa-network-wired"></i>{" "}
              </span>
              <br />
              Employers
            </a>
          </li>
          <li className={activeLink === 3 ? "active" : ""}>
            <a href="/viewmyjobs">
              <span className="nav-icon">
                <i className="fa-solid fa-book-journal-whills"></i>
              </span>
              <br />
              Added Jobs
            </a>
          </li>
          <br />

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
        </ul>
        <p id="welcomeUser">Welcome, {user.u_lastname}</p>
      </nav>{" "}
    </div>
  );
}

export default NavBar;
