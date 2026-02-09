import React, { useEffect, useState } from "react";
import "./Navbar.css";
import nav_logo from "../../assets/nav-logo.png";
import nav_profile from "../../assets/nav-profile.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="navbar">
      <img src={nav_logo} alt="Logo" className="nav-logo" />

      <div className="nav-right">
        {/* Toggle */}
        <div className={`theme-toggle ${darkMode ? "active" : ""}`} onClick={toggleTheme}>
          <span className="toggle-dot" />
        </div>

        <img src={nav_profile} alt="Profile" className="nav-profile" />
      </div>
    </div>
  );
};

export default Navbar;
