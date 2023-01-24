import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/profile") {
      setActiveLink(0);
    } else if (window.location.pathname === "/jobs") {
      setActiveLink(1);
    } else if (window.location.pathname === "/employer") {
      setActiveLink(2);
    }
  }, [window.location.pathname]);

  return (
    <div className="navbar">
      <nav className="navigation-bar">
        <ul>
          <li className={activeLink === 0 ? "active" : ""}>
            <a
              href="#"
              onClick={() => {
                navigate("/profile");
                // setActiveLink(0);
              }}
            >
              <span className="nav-icon">
                <i className="fa-solid fa-house"></i>
              </span>
              <br />
              Home
            </a>
          </li>
          <li className={activeLink === 1 ? "active" : ""}>
            <a
              href="#"
              onClick={() => {
                navigate("/jobs");
                // setActiveLink(1);
              }}
            >
              <span className="nav-icon">
                <i className="fa-solid fa-suitcase"></i>
              </span>
              <br />
              Jobs
            </a>
          </li>
          <li className={activeLink === 2 ? "active" : ""}>
            <a
              href="#"
              onClick={() => {
                navigate("/employer");
                // setActiveLink(2);
              }}
            >
              <span className="nav-icon">
                <i className="fa-solid fa-network-wired"></i>{" "}
              </span>
              <br />
              Employers
            </a>
          </li>
          <a
            href="#"
            id="logout"
            onClick={() => {
              navigate("/");
              window.localStorage.removeItem("isLoggedIn");
            }}
          >
            Log Out
          </a>
        </ul>
      </nav>{" "}
    </div>
  );
}

export default NavBar;
