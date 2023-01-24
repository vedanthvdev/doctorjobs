import { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { useNavigate } from "react-router-dom";

function Profile({ isAuthenticated }) {
  const [jobs, setJobs] = useState([]);
  let navigate = useNavigate();

  // useState hook to store the filtered jobs
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3000/api/getjobs", {
          responseType: "json",
        })
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
          setFilteredJobs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  // useRef hook to create references to the filter form elements
  const jobTitleInput = useRef(null);
  const locationInput = useRef(null);
  const jobTypeSelect = useRef(null);

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

      <br />
      <ul id="jobs-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <form className="jobs-available">
              <div className="job-card">
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.job_type}</p>
                <a href={job.apply_link}>Apply Now</a>
              </div>
            </form>
          ))
        ) : (
          <div>No jobs found</div>
        )}
      </ul>
    </div>
  );
}
export default Profile;
