import {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from "react";
import "./App.css";
import "./DarkApp.css";

import "./components/profile/Profile.css";
import "./components/navigationBar/NavBar.css";
import "./components/signup/SignUp.css";
import "./components/Toast/Toast.css";
import "./components/home/HomePage.css";
import "./components/settin/Settings.css";

import "./components/registerJobs/RegisterJob.css";
import Profile from "./components/profile/Profile";
import LoginForm from "./components/login/LoginForm";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import ReactSwitch from "react-switch";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import Jobs from "./components/jobs/Jobs";
import ViewMyJobs from "./components/registerJobs/ViewMyJobs";
import Settings from "./components/settin/Settings";
import UpdatePassword from "./components/forgotPassword/UpdatePassword";
import RegisterJob from "./components/registerJobs/RegisterJob";
import Home from "./components/home/HomePage";

export const ThemeContext = createContext(null);

function App() {
  let navigate = useNavigate();

  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "Light"
  );

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "Light" ? "Dark" : "Light"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const loggedIn = window.localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!loggedIn) {
      const blockedUrls = [
        "/profile",
        "/jobs",
        "/registerjob",
        "/viewmyjobs",
        "/settings",
      ];
      const currentUrl = window.location.pathname;
      if (blockedUrls.includes(currentUrl)) {
        navigate("/login");
      }
    }
  }, [loggedIn, navigate]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="App" id={theme}>
        <Routes>
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/registerjob" element={<RegisterJob />} />

          <Route exact path="/viewmyjobs" element={<ViewMyJobs />} />

          <Route exact path="/jobs" element={<Jobs />} />

          <Route exact path="/settings" element={<Settings />} />

          {/* allow without being logged in */}
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/updatepassword" element={<UpdatePassword />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/home" />} />
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
