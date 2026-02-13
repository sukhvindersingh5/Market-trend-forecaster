import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Profile</h1>
        <p>{token ? "You are logged in." : "You are not logged in."}</p>
        <div style={{ marginTop: "20px" }}>
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={{ marginLeft: "12px" }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
