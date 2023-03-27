import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { ipAddress } from "../../address";
import DeleteConfirmationModal from "../contact/DeleteConfirmationModal";
import JobModal from "../jobs/jobModal";

function ViewMyJobs() {
  const [jobs, setJobs] = useState("");
  const [spinner, setSpinner] = useState(true);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [deleteJobId, setDeleteJobId] = useState(null);

  const openDeleteConfirmationModal = (event, id) => {
    event.preventDefault();
    setDeleteJobId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteJobId(null);
  };

  const handleDelete = () => {
    axios
      .post(ipAddress + "/api/deletejob", {
        userId: deleteJobId,
      })
      .catch((error) => {
        console.log(error);
      });

    closeDeleteConfirmationModal();
    window.location.reload();
  };

  useEffect(() => {
    axios
      .post(ipAddress + "/api/getuseruploadedjobs", {
        userId: window.localStorage.getItem("userId"),
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
      <link rel="stylesheet" href="RegisterJob.css"></link>

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
        <JobModal
          filteredJobs={jobs}
          openDeleteConfirmationModal={openDeleteConfirmationModal}
        />
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
              handleDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMyJobs;
