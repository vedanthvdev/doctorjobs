import React, { useEffect, useState } from "react";
import NavBar from "../navigationBar/NavBar";
import axios from "axios";
import { ipAddress } from "../../address";

function Settings() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");

  const [qualification, setqualification] = useState("");

  const [spinner, setSpinner] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openProfileModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function submitForm(e) {
    e.preventDefault();
    setSpinner(true);
    axios
      .post(ipAddress + "/api/updateprofile", {
        id: user.u_id,
        title: title,
        qualification: qualification,
      })
      .then((response) => {
        if (response.data.message) {
          console.log("Successfully updated your profile");
        } else {
          return null;
        }
        setSpinner(false);
        closeModal();
      });
  }

  useEffect(() => {
    axios
      .post(ipAddress + "/api/getuser", {
        id: window.localStorage.getItem("userId"),
      })
      .then((response) => {
        setUser(response.data);
        setTitle(response.data.u_title);
        setqualification(response.data.u_qualification);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="settings-body">
      <link rel="stylesheet" href="Settings.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>

      {<NavBar />}
      <h1 id="welcomeUser">Welcome, {user.u_lastname}</h1>

      <a
        href="/login"
        id="logout"
        onClick={() => {
          window.localStorage.removeItem("isLoggedIn");
          window.localStorage.removeItem("userId");
          document.getElementById("signInDIv").hidden = false;
        }}
      >
        Log Out
      </a>
      <button className="edit-profile" onClick={(e) => openProfileModal(e)}>
        Edit Profile
      </button>

      <br />
      {user && (
        <div className={`modal-overlay ${isOpen ? "show" : "hide"}`}>
          <div className={`modal-content ${isOpen ? "show" : "hide"}`}>
            <div className="modal-overlay">
              <form className="profile-content" onSubmit={submitForm}>
                <h4>Profile Details</h4>
                {/* Email */}
                <label type="edit-profile" id="profile">
                  <span className="icon">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    id="job-email"
                    required
                    value={user.u_email}
                    disabled
                    style={{ background: "gray", color: "black" }}
                  />
                </label>
                {/* First Name */}
                <label type="edit-profile" id="profile">
                  <span className="icon">
                    <i className="fa-solid fa-user-doctor"></i>
                  </span>
                  <input
                    type="text"
                    id="profile-firstname"
                    required
                    value={user.u_firstname}
                    disabled
                    style={{ background: "gray", color: "black" }}
                  />
                </label>
                {/* Last Name */}
                <label type="edit-profile" id="profile">
                  <span className="icon">
                    <i className="fa-solid fa-user-doctor"></i>
                  </span>
                  <input
                    type="text"
                    id="profile-lastname"
                    required
                    value={user.u_lastname}
                    disabled
                    style={{ background: "gray", color: "black" }}
                  />
                </label>
                {/* Job title */}
                <label type="add-job" id="job">
                  <span className="icon">
                    <i className="fa-solid fa-user-doctor"></i>
                  </span>
                  <input
                    type="text"
                    id="profile-title"
                    value={title === null ? "" : title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Job Title"
                  />
                </label>

                {/* Qualification */}
                <label type="add-job" id="job">
                  <span className="icon">
                    <i className="fa fa-suitcase"></i>
                  </span>
                  <input
                    type="text"
                    id="profile-qualification"
                    value={qualification === null ? "" : qualification}
                    onChange={(e) => {
                      setqualification(e.target.value);
                    }}
                    placeholder="Qualifications"
                  />
                </label>
                <br />
                <button id="close-edit-profile" onClick={closeModal}>
                  Close
                </button>
                <button id="submit" type="submit" value="Submit">
                  {spinner === true ? (
                    <span className="spinner">
                      <i className="fa-solid fa-spinner"></i>
                    </span>
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              </form>
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
