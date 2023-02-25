import React, { useState } from "react";
import axios from "axios";
import NavBar from "../navigationBar/NavBar";
import { ipAddress } from "../../address";

function Employer() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [jobLink, setJobLink] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState("");

  const register = (e) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

    axios
      .post(ipAddress + "/api/registerjob", {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        job_type: jobType,
        apply_link: jobLink,
        jobSalary: jobSalary,
        date: formattedDate,
        contact: JSON.stringify([{ email: email, phone: phoneNumber }]),
        userId: window.localStorage.getItem("userId"),
      })
      .then((response) => {
        console.log(response);
      });
    setSuccess("Job Uploaded Successfully");
    setTimeout(() => {
      window.location.reload();
      setSuccess("");
    }, 2000);
  };

  return (
    <div className="jobAddition">
      <link rel="stylesheet" href="signup.css"></link>
      <link rel="stylesheet" href="Employer.css"></link>

      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      ></link>
      {<NavBar />}
      <form className="addjob-container" onSubmit={register}>
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
            placeholder="Job Title*"
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
            placeholder="Company*"
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
            placeholder="Location*"
          />
        </label>
        <br />

        <label type="add-job">
          <span className="icon">
            <i className="fa-solid fa-link"></i>
          </span>
          <input
            type="url"
            id="job-link"
            onChange={(e) => {
              setJobLink(e.target.value);
            }}
            placeholder="Link to apply"
          />
        </label>
        <br />

        <label type="add-job">
          <span className="icon">
            <i className="fa-solid fa-link"></i>
          </span>
          <input
            type="number"
            id="job-salary"
            onChange={(e) => {
              setJobSalary(e.target.value);
            }}
            placeholder="Salary"
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
            placeholder="Email Contact"
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
            placeholder="Phone Contact"
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
            <option value="Full-time">Full-time*</option>
            <option value="Part-time">Part-time*</option>
            <option value="Locum">Locum*</option>
          </select>
        </label>

        {success && <div className="successValue">{success}</div>}

        <br />
        <button id="submit" type="submit" value="Submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Employer;
