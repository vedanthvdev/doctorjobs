const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

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
app.post("/signup", (req, res) => {
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

// Check if the user is present in the database
app.post("/login", (req, res) => {
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

app.listen(3000, () => {
  console.log("running server");
});
