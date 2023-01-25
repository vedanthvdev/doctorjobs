import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filterTitle, setFilterTitle] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterJobType, setFilterJobType] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
          {contact.email && <p>Email: {contact.email}</p>}
          {contact.phone && <p>Phone: {contact.phone}</p>}
          <button id="close-modal" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getjobs", {
        responseType: "json",
      })
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // function to filter jobs
  function filterJobs(e) {
    // filter the jobs
    e.preventDefault();
    const filteredJobs = jobs.filter((job) => {
      if (
        (job.title.toLowerCase().includes(filterTitle) ||
          filterTitle.length === 0) &&
        (job.location.toLowerCase().includes(filterLocation) ||
          filterLocation.length === 0) &&
        (job.job_type === filterJobType ||
          filterJobType.length === 0 ||
          filterJobType === "All")
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

          <input type="submit" value="Filter" id="filter-submit" />
        </form>
      </div>
      <br />

      <ul id="all-jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <form className="all-jobs-available" key={job.id}>
              <div className="job-card" id={job.id}>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.job_type}</p>
                {job.apply_link && (
                  <a href={job.apply_link} className="apply-link">
                    Apply Now
                  </a>
                )}
                {(job.contact[0].phone || job.contact[0].email) && (
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
