import BackgroundParticles from "../BackgroundParticles/Particles";
import { useEffect, useState } from "react";
import axios from "axios";
import { ipAddress } from "../../address";
import JobModal from "../jobs/jobModal";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios
      .get(ipAddress + "/api/getrecentjobs", {
        responseType: "json",
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log("No jobs found");
      });
    setSpinner(false);
  }, []);

  return (
    <div className="login">
      <div className="login-app">
        <BackgroundParticles />

        <link rel="stylesheet" href="HomePage.css"></link>

        <a href="/login" id="login-link">
          Login
        </a>
        <br />
        <a href="/signup" id="signup-link">
          Sign Up
        </a>
        <br />
      </div>
      <div className="home-page">
        <p className="company-page-title">Hospital Jobs</p>
        <p className="home-page-title">
          Welcome to <span className="custom-color">Hospital Jobs</span> Site
        </p>
        <p className="home-page-title">
          Find the perfect job in the medical field,
        </p>

        <p className="home-page-title">with our comprehensive job listings.</p>
        <br />
        <div className="recent-jobs-home">
          <br />
          {spinner === true ? (
            <ul id="jobs-list">
              <span className="spinner">
                <i className="fa-solid fa-spinner"></i>
              </span>
            </ul>
          ) : (
            <JobModal filteredJobs={jobs} />
          )}
        </div>
        <footer id="footer">
          <h5 className="footHead">Contact Us</h5>
          <p className="foot">Email: vedanth.vasudev@gmail.com</p>
          <p className="foot">Phone: +447774713897</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
