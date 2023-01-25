import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";

function Profile() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getrecentjobs", {
        responseType: "json",
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <form className="jobs-available" key={job.id}>
              <div className="job-card" id={job.id}>
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
