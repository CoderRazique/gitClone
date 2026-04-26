import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <span>GitHub</span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/repo/create" className="nav-link">
          Create Repository
        </Link>

        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
