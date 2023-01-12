import { useState, useEffect } from "react";
import "./App.css";
import "./signup.css";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import { useNavigate, Navigate, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Axios from "axios";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState();

  const LoginUser = (details) => {
    console.log(details);

    Axios.post("http://localhost:3000/login", {
      email: details.email,
      password: details.password,
    }).then((response) => {
      if (!response.data.message) {
        console.log("Successfully Logged in! Welcom to your future");
        setUser({
          email: details.email,
          password: details.password,
        });
        setError("");
        navigate("/profile");
      } else {
        console.log("The details don't match");
        setError("The details don't match");
      }
    });
  };

  const Logout = (details) => {
    console.log(details);
    setUser({ email: "", password: "" });
  };

  return (
    // <div className={`${error ? "vibrate-error transparent-red-screen" : ""}`}>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        exact
        path="/login"
        element={
          <LoginForm LoginUser={LoginUser} error={error} setError={setError} />
        }
      />
      <Route exact path="/profile" element={<HomePage user={user} />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
    // </div>
  );
}

export default App;
