import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">AI Market Forecaster</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <button onClick={() => scrollToSection("about")} className="nav-btn">
          About
        </button>
        <button onClick={() => scrollToSection("features")} className="nav-btn">
          Features
        </button>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              type="button"
              className="profile-icon-btn"
              aria-label="Profile"
              onClick={() => navigate("/profile")}
            >
              <svg
                className="profile-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
