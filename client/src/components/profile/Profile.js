import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { ipAddress } from "../../address";
import ContactModal from "../contact/ContactModal";

function Profile() {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [contact, setContact] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const openContactModal = (event, jobContact) => {
    event.preventDefault();
    setContact(jobContact);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContact(null);
  };

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
        <ul id="jobs-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <form className="jobs-available" key={job.id}>
                <div className="job-card" id={job.id}>
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p>
                    {job.job_type} {job.job_salary}
                  </p>
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
            <form className="empty-Jobs">No jobs found</form>
          )}
        </ul>
      )}
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
export default Profile;
