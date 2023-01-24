const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "LoginSystem",
});

// Register user into the database
app.post("/api/signup", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (u_firstname, u_lastname, u_email, u_password) VALUES (?,?,?,?)",
    [firstname, lastname, email, password],
    (err, result) => {
      console.log(err);
    }
  );
});

// Register a job into the database
app.post("/api/registerjob", (req, res) => {
  const title = req.body.title;
  const company = req.body.company;
  const location = req.body.location;
  const job_type = req.body.job_type;
  const apply_link = req.body.apply_link;
  const date = req.body.date;
  const contact = req.body.contact;

  db.query(
    "INSERT INTO jobs (j_title, j_company, j_location, j_type, j_link, j_date) VALUES (?,?,?,?,?,?)",
    [title, company, location, job_type, apply_link, date],
    (err, result) => {
      console.log(err);
    }
  );
});

// Check if the user is present in the database
app.post("/api/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE u_email = ? AND u_password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password" });
      }
    }
  );
});

// Check if the Email is present in the database
app.post("/api/forgotpassword", (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE u_email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Email not found" });
    }
  });
});

//Get all the jobs
app.get("/api/getjobs", (req, res) => {
  db.query(
    'SELECT json_arrayagg(JSON_OBJECT("title", j_title, "company", j_company, "location", j_location, "job_type", j_type, "apply_link", j_link, "contact", j_contact)) as job FROM LoginSystem.jobs;',
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Unable to fetch jobs" });
        return;
      }
      if (result.length > 0) {
        res.send(JSON.parse(result[0].job));
      } else {
        res.status(404).send({ error: "No jobs found" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("running server");
});
