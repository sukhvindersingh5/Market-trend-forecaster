import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/landing.css";

const Navbar = () => {
  const location = useLocation();

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
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
