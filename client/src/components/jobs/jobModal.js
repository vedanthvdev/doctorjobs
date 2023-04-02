import React, { useState } from "react";
import ContactModal from "../contact/ContactModal";

function JobModal({ filteredJobs, openDeleteConfirmationModal }) {
  const [contact, setContact] = useState("");
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

  const validateCont = (conct) => {
    const finl = JSON.parse(conct);
    return finl[0];
  };

  return (
    <div>
      {
        <ul id="all-jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <form className="all-jobs-available" key={job.j_id}>
                <div className="job-card" id={job.j_id}>
                  <h4>{job.j_title}</h4>
                  <p>{job.j_company}</p>
                  <p>{job.j_location}</p>
                  <p>
                    {job.j_type} {job.j_salary}
                  </p>
                  <div className="contact-section">
                    {job.j_link && (
                      <a href={job.j_link} className="apply-link">
                        Apply Now
                      </a>
                    )}

                    {(validateCont(job.j_contact).phone ||
                      validateCont(job.j_contact).email) && (
                      <button
                        className="contact-button"
                        onClick={(e) =>
                          openContactModal(e, validateCont(job.j_contact))
                        }
                      >
                        Contact
                      </button>
                    )}
                    {openDeleteConfirmationModal && (
                      <button
                        className="deleteJob"
                        onClick={(e) =>
                          openDeleteConfirmationModal(e, job.j_id)
                        }
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
