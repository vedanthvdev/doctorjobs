import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { ipAddress } from "../../address";
import JobModal from "./jobModal";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filterTitle, setFilterTitle] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterJobType, setFilterJobType] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios
      .get(ipAddress + "/api/getjobs", {
        responseType: "json",
      })
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log("No Job found");
      });
  }, []);

  // function to filter jobs
  function filterJobs(e) {
    e.preventDefault();

    const filteredJobs = jobs.filter(
      (job) =>
        (job.j_title.toLowerCase().includes(filterTitle) ||
          filterTitle.length === 0) &&
        (job.j_location.toLowerCase().includes(filterLocation) ||
          filterLocation.length === 0) &&
        (job.j_type === filterJobType ||
          filterJobType.length === 0 ||
          filterJobType === "All")
    );

    setFilteredJobs(filteredJobs);
  }

  return (
    <div className="filter-container">
      <link rel="stylesheet" href="profile.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>
      {<NavBar />}

      <div className="filter-jobs">
        <form type="filter-job" onSubmit={filterJobs}>
          <label className="filter">
            <span className="icon">
              <i className="fa-solid fa-user-doctor"></i>
            </span>
            <input
              type="text"
              id="job-title"
              name="job-title"
              onChange={(e) => {
                setFilterTitle(e.target.value.toLowerCase());
              }}
              placeholder="Job Title"
            />
          </label>
          <label>
            <span className="icon">
              <i className="fa-solid fa-map-location-dot"></i>
            </span>
            <input
              type="text"
              id="location"
              name="location"
              onChange={(e) => {
                setFilterLocation(e.target.value.toLowerCase());
              }}
              placeholder="Location"
            />
          </label>
          <br />

          <label>
            <select
              id="job-type"
              name="job-type"
              placeholder="Job type"
              onChange={(event) => {
                setFilterJobType(event.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Locum">Locum</option>
            </select>
          </label>

          <button type="submit" value="Filter" id="filter-submit">
            Filter
          </button>
        </form>
      </div>

      <br />
      {spinner === true ? (
        <ul id="all-jobs-list">
          <span className="spinner">
            <i className="fa-solid fa-spinner"></i>
          </span>
        </ul>
      ) : (
        <JobModal filteredJobs={filteredJobs} />
      )}
    </div>
  );
}

export default Jobs;
