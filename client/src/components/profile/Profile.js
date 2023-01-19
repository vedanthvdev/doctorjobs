import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import NavBar from "../navigationBar/NavBar";

function Profile(user, Logout) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3000/getjobs")
      .then((response) => {
        console.log(response.data);
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useRef hook to create references to the filter form elements
  const jobTitleInput = useRef(null);
  const locationInput = useRef(null);
  const jobTypeSelect = useRef(null);

  // useState hook to store the filtered jobs
  const [filteredJobs, setFilteredJobs] = useState([]);

  // function to filter jobs
  function filterJobs() {
    // get the filter values
    const jobTitle = jobTitleInput.current.value.toLowerCase();
    const location = locationInput.current.value.toLowerCase();
    const jobType = jobTypeSelect.current.value;

    // filter the jobs
    const filteredJobs = jobs.filter((job) => {
      if (
        (job.title.toLowerCase().includes(jobTitle) || jobTitle === "") &&
        (job.location.toLowerCase().includes(location) || location === "") &&
        (job.job_type === jobType || jobType === "all")
      ) {
        return true;
      }
      return false;
    });
    // update the filtered jobs in state
    setFilteredJobs(filteredJobs);
  }

  return (
    <div className="profile">
      <link rel="stylesheet" href="profile.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>
      {<NavBar />}
      <div className="filter-jobs">
        <form type="filter-job">
          <label className="filter">
            <span className="icon">
              <i className="fa-solid fa-user-doctor"></i>
            </span>
            <input
              type="text"
              id="job-title"
              name="job-title"
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
              placeholder="Location"
            />
          </label>

          <br />
          <label>
            <select id="job-type" name="job-type" placeholder="Job type">
              <option value="all">All</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
          </label>

          <input type="submit" value="Filter" id="filter-submit" />
        </form>
      </div>

      <ul id="jobs-list">
        {jobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.job_type}</p>
              <a href={job.apply_link}>Apply Now</a>
            </div>
          ))
        ) : (
          <div>No jobs found</div>
        )}
      </ul>
    </div>
  );
}
export default Profile;
