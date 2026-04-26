import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
import logo from "../../assets/github-mark-white.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://52.90.203.90:3000/signup", {
        email,
        password,
        username,
      });

      const userId = res.data.userId || res.data.user?._id;

      if (!userId) {
        throw new Error("User ID not found");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);

      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup Failed!");
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
        <h1 className="login-title">Sign Up</h1>

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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading..." : "Signup"}
          </button>
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
