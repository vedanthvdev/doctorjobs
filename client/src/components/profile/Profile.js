import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { ipAddress } from "../../address";
import JobModal from "../jobs/jobModal";

function Profile() {
  const [jobs, setJobs] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios
      .get(ipAddress + "/api/getrecentjobs", {
        responseType: "json",
      })
      .then((response) => {
        setJobs(response.data);
        setSpinner(false);
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
  );
}
export default Profile;
