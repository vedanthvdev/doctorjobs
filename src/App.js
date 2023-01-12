import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import { Navigate, Routes, Route } from "react-router-dom";

function App() {
  const adminUser = {
    email: "chintudon123@gmail.com",
    password: "chintu",
  };

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState();

  const LoginUser = (details) => {
    console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Successfully Logged in! Welcom to your future");
      setUser({
        email: details.email,
        password: details.password,
      });
      setError("");
    } else {
      console.log("The details don't match");
      setError("The details don't match");
    }
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
    </Routes>
    // </div>
  );
}

export default App;
