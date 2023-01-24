import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function NavBar() {
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
          <a
            href="/login"
            id="logout"
            onClick={() => {
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
