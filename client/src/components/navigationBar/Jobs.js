import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navigationBar/NavBar";

function Jobs({ isAuthenticated }) {
  let navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [contact, setContact] = useState(null);

  const openContactModal = (event, jobContact) => {
    event.preventDefault();
    setContact(jobContact);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContact(null);
  };

  const ContactModal = ({ contact, closeModal }) => {
    if (!contact) {
      return null;
    }
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h4>Contact Details</h4>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <button id="close-modal" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3000/api/getjobs", {
          responseType: "json",
        })
        .then((response) => {
          setJobs(response.data);
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
    if (!isDataFetched) {
      return;
    }

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
    <div className="signup-body">
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
              <option value="part-time">Locum</option>
            </select>
          </label>

          <input
            type="submit"
            value="Filter"
            id="filter-submit"
            onClick={filterJobs}
          />
        </form>
      </div>
      <br />
      <ul id="all-jobs-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <form className="all-jobs-available">
              <div className="job-card">
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.job_type}</p>
                {job.apply_link && (
                  <a href={job.apply_link} className="apply-link">
                    Apply Now
                  </a>
                )}
                {job.contact && (
                  <button
                    className="contact-button"
                    onClick={(e) => openContactModal(e, job.contact[0])}
                  >
                    Contact
                  </button>
                )}
              </div>
            </form>
          ))
        ) : (
          <div>No jobs found</div>
        )}
      </ul>
      {contact && (
        <div className={`modal-overlay ${isOpen ? "show" : "hide"}`}>
          <div className={`modal-content ${isOpen ? "show" : "hide"}`}>
            <ContactModal contact={contact} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
