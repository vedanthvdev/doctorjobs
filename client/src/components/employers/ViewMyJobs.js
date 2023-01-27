import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";

function ViewMyJobs() {
  const [jobs, setJobs] = useState("");

  const handleDelete = () => {
    axios
      .post("http://localhost:3000/api/deletejob", {
        userId: deleteJobId,
      })
      .catch((error) => {
        console.log(error);
      });

    closeDeleteConfirmationModal();
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [contact, setContact] = useState(null);

  const [deleteJobId, setDeleteJobId] = useState(null);

  const openDeleteConfirmationModal = (event, id) => {
    event.preventDefault();
    setDeleteJobId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const openContactModal = (event, jobContact) => {
    event.preventDefault();
    setContact(jobContact);
    setIsOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteJobId(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContact(null);
  };

  const DeleteConfirmationModal = ({
    deleteJobId,
    closeDeleteConfirmationModal,
  }) => {
    if (!deleteJobId) {
      return null;
    }
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h4>Confirm Deleting the job</h4>
          <button
            id="close-delete-modal"
            onClick={closeDeleteConfirmationModal}
          >
            Close
          </button>
          <button id="confirm-delete-modal" onClick={handleDelete}>
            Confirm
          </button>
        </div>
      </div>
    );
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
      .post("http://localhost:3000/api/getuseruploadedjobs", {
        userId: window.localStorage.getItem("userId"),
      })
      .then((response) => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="profile">
      <link rel="stylesheet" href="profile.css"></link>
      <link rel="stylesheet" href="Employer.css"></link>

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
                <button
                  className="deleteJob"
                  onClick={(e) => openDeleteConfirmationModal(e, job.id)}
                >
                  <i className="fa-solid fa-trash"></i>{" "}
                </button>
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

      {deleteJobId && (
        <div
          className={`modal-overlay ${
            isDeleteConfirmationOpen ? "show" : "hide"
          }`}
        >
          <div
            className={`modal-content ${
              isDeleteConfirmationOpen ? "show" : "hide"
            }`}
          >
            <DeleteConfirmationModal
              deleteJobId={deleteJobId}
              closeDeleteConfirmationModal={closeDeleteConfirmationModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMyJobs;
