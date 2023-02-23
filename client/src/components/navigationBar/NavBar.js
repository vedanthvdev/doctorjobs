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
    } else if (window.location.pathname === "/viewmyjobs") {
      setActiveLink(3);
    } else if (window.location.pathname === "/settings") {
      setActiveLink(4);
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
              All Jobs
            </a>
          </li>
          <li className={activeLink === 2 ? "active" : ""}>
            <a href="/employer">
              <span className="nav-icon">
                <i className="fa-solid fa-network-wired"></i>{" "}
              </span>
              <br />
              Add Job
            </a>
          </li>
          <li className={activeLink === 3 ? "active" : ""}>
            <a href="/viewmyjobs">
              <span className="nav-icon">
                <i className="fa-solid fa-book-journal-whills"></i>
              </span>
              <br />
              View My Jobs
            </a>
          </li>
          <li className={activeLink === 4 ? "active" : ""}>
            <a href="/settings">
              <span className="nav-icon">
                <i className="fa-solid fa-gear"></i>
              </span>
              <br />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
