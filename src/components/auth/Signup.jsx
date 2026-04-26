import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom"; // ✅ FIX

import { Box, Button, Heading } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate(); // ✅ FIX

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!email || !username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/signup", {
        email,
        password,
        username,
      });

      console.log("Signup Response:", res.data); // 🔍 DEBUG

      // ✅ Handle both response formats
      const userId = res.data.userId || res.data.user?._id;

      if (!userId) {
        throw new Error("User ID not found in response");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);

      // ✅ SPA redirect (NO reload)
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Signup Failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 2, borderBottom: "1px solid #d0d7de", mb: 3 }}>
            <Heading as="h1">Sign Up</Heading>
          </Box>
        </div>

        <form className="login-box" onSubmit={handleSignup}>
          <div>
            <label className="label">Username</label>
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
