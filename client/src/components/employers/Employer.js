import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";

function Employer() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [jobLink, setJobLink] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const register = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    axios
      .post("http://localhost:3000/api/registerjob", {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        job_type: jobType,
        apply_link: jobLink,
        date: formattedDate,
        contact: "email:" + email + "number:" + phoneNumber,
        //   JSON.parse(
        //   '{"email":' + '"' + email + '",' + '"phone":"' + phoneNumber + '"}'
        // ),
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="signup-body">
      {<NavBar />}

      <form
        data-testid="signup-form"
        className="signup-container"
        onSubmit={register}
      >
        <link rel="stylesheet" href="signup.css"></link>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        ></link>
        <h3>Add Job</h3>

        <label type="add-job" id="job">
          <span className="icon">
            <i className="fa-solid fa-user-doctor"></i>
          </span>
          <input
            type="text"
            id="job-title"
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
            required
            placeholder="Job Title"
          />
        </label>
        <br />
        <label type="add-job">
          <span className="icon">
            <i className="fa-solid fa-building"></i>
          </span>
          <input
            type="text"
            id="job-company"
            required
            onChange={(e) => {
              setJobCompany(e.target.value);
            }}
            placeholder="Company"
          />
        </label>
        <br />

        <label type="add-job">
          <span className="icon">
            <i className="fa-solid fa-map-location-dot"></i>
          </span>
          <input
            type="text"
            id="job-location"
            required
            onChange={(e) => {
              setJobLocation(e.target.value);
            }}
            placeholder="Location"
          />
        </label>
        <br />

        <label type="add-job">
          <span className="icon">
            <i className="fa-solid fa-link"></i>
          </span>
          <input
            type="text"
            id="job-link"
            onChange={(e) => {
              setJobLink(e.target.value);
            }}
            placeholder="Link to apply"
          />
        </label>
        <br />

        <label type="signup" id="name">
          <span className="icon">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="email"
            id="job-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Contact Email"
            style={{ display: "inline-block", width: "50%" }}
          />
          <span className="icon">
            <i className="fa-solid fa-user-doctor"></i>
          </span>
          <input
            type="text"
            id="job-number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            placeholder="Contact Number"
            style={{ display: "inline-block", width: "50%" }}
          />
        </label>
        <br />

        <label type="add-job">
          <select
            id="job-type"
            name="job-type"
            placeholder="Job type"
            required
            onChange={(event) => {
              setJobType(event.target.value);
            }}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Locum">Locum</option>
          </select>
        </label>

        {/* {error === "" ? "" : <div className="errorValue">{error}</div>} */}

        <br />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Employer;
