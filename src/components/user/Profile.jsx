import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { FaBook, FaStar } from "react-icons/fa";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // 🔒 protect route
    if (!userId) {
      navigate("/auth");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/userProfile/${userId}`,
        );
        setUserDetails(response.data);
      } catch (err) {
        console.error("Cannot fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/auth"); // ✅ SPA navigation
  };

  return (
    <>
      <Navbar />

      {/* ✅ Replacement for UnderlineNav */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "12px 20px",
          borderBottom: "1px solid #30363d",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaBook />
          Overview
        </span>

        <span
          onClick={() => navigate("/repo")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            color: "#8b949e",
          }}
        >
          <FaStar />
          Starred Repositories
        </span>
      </div>

      <button
        onClick={handleLogout}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails?.username || "Loading..."}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Followers</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
