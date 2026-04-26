import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { FaBook, FaStar } from "react-icons/fa";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/auth");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${API}/userProfile/${userId}`);
        setUserDetails(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <>
      <Navbar />

      {/* Tabs */}
      <div className="profile-tabs">
        <span className="active-tab">
          <FaBook /> Overview
        </span>

        <span onClick={() => navigate("/repo")}>
          <FaStar /> Starred
        </span>
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* MAIN */}
      <div className="profile-page-wrapper">
        <div className="profile-container">
          {/* LEFT */}
          <div className="user-profile-section">
            <div className="profile-image"></div>

            <h3>{userDetails?.username || "Loading..."}</h3>

            <button className="follow-btn">Follow</button>

            <div className="follower">
              <p>10 Followers</p>
              <p>3 Following</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="profile-right">
            <div className="heat-map-section">
              <HeatMapProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
