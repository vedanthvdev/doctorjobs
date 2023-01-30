import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";

function Profile() {
  const [jobs, setJobs] = useState([]);
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
                )}{" "}
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
export default Profile;
