import React, { useState } from "react";
import ContactModal from "../contact/ContactModal";

function JobModal({ filteredJobs, openDeleteConfirmationModal }) {
  const [contact, setContact] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = (event, jobContact) => {
    event.preventDefault();
    setContact(jobContact);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContact(null);
  };

  return (
    <div>
      {
        <ul id="all-jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <form className="all-jobs-available" key={job.id}>
                <div className="job-card" id={job.id}>
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p>
                    {job.job_type} {job.job_salary}
                  </p>
                  <div className="contact-section">
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
                    {openDeleteConfirmationModal && (
                      <button
                        className="deleteJob"
                        onClick={(e) => openDeleteConfirmationModal(e, job.id)}
                      >
                        <i className="fa-solid fa-trash"></i>{" "}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ))
          ) : (
            <form className="empty-Jobs">No jobs found</form>
          )}
        </ul>
      }
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

export default JobModal;
