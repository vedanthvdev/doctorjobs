import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { ipAddress } from "../../address";
import ContactModal from "../contact/ContactModal";
import JobModal from "../jobs/jobModal";

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
        <JobModal filteredJobs={jobs} openContactModal={openContactModal} />
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
