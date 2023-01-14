import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <nav className="navigation-bar">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Employers</a>
          </li>
          <li>
            <a href="#">Candidates</a>
          </li>
          <a href="#" id="signup-link" onClick={() => navigate("/")}>
            Log Out
          </a>
        </ul>
      </nav>{" "}
    </div>
  );
}

export default NavBar;
