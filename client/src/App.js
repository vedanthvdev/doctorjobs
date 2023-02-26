import { useState, useEffect } from "react";
import "./App.css";
import "./DarkApp.css";

import "./components/profile/Profile.css";
import "./components/navigationBar/NavBar.css";
import "./components/signup/SignUp.css";
import "./components/Toast/Toast.css";

import "./components/registerJobs/RegisterJob.css";
import Profile from "./components/profile/Profile";
import LoginForm from "./components/login/LoginForm";
import { Navigate, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import { createContext } from "react";
import ReactSwitch from "react-switch";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import Jobs from "./components/jobs/Jobs";
import ViewMyJobs from "./components/registerJobs/ViewMyJobs";
import Settings from "./components/settin/Settings";
import UpdatePassword from "./components/forgotPassword/UpdatePassword";
import RegisterJob from "./components/registerJobs/RegisterJob";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "Light"
  );
  const toggleTheme = () => {
    setTheme((current) => (current === "Light" ? "Dark" : "Light"));
  };

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const [user, setUser] = useState({ email: "", password: "" });

  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            exact
            path="/login"
            element={<LoginForm setUser={setUser} />}
          />
          <Route
            exact
            path="/profile"
            element={loggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/registerjob"
            element={loggedIn ? <RegisterJob /> : <Navigate to="/login" />}
          />

          <Route
            exact
            path="/viewmyjobs"
            element={loggedIn ? <ViewMyJobs /> : <Navigate to="/login" />}
          />

          <Route
            exact
            path="/jobs"
            element={loggedIn ? <Jobs /> : <Navigate to="/login" />}
          />

          <Route
            exact
            path="/settings"
            element={loggedIn ? <Settings /> : <Navigate to="/login" />}
          />

          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/updatepassword" element={<UpdatePassword />} />
        </Routes>
        <div className="switch">
          <label id="switch">
            {theme} Mode
            <br />
            <ReactSwitch onChange={toggleTheme} checked={theme === "Dark"} />
          </label>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
