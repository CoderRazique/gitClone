import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const API = import.meta.env.VITE_API_URL || "http://52.90.203.90:3000";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`${API}/repo/user/${userId}`);
        const data = await res.json();
        setRepositories(data.repositories || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load repositories");
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const res = await fetch(`${API}/repo/all`);
        const data = await res.json();
        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    Promise.all([fetchRepositories(), fetchSuggestedRepositories()]).finally(
      () => setLoading(false),
    );
  }, []);

  const filteredRepos = repositories.filter((repo) =>
    repo?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="dashboard-wrapper">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="dashboard-container">
        {/* LEFT SIDEBAR */}
        <aside className="left-sidebar">
          <h3>Suggested Repositories</h3>

          {suggestedRepositories.length === 0 ? (
            <p>No suggestions</p>
          ) : (
            suggestedRepositories.map((repo) => (
              <div key={repo._id} className="repo-card">
                <h4>{repo.name}</h4>
                <p>{repo.description || "No description"}</p>
              </div>
            ))
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <h2>Your Repositories</h2>

          <div id="search">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : filteredRepos.length === 0 ? (
            <p>No repositories found</p>
          ) : (
            filteredRepos.map((repo) => (
              <div key={repo._id} className="repo-card">
                <h4>{repo.name}</h4>
              </div>
            ))
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="right-sidebar">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Tech Conference - Dec 15</li>
            <li>Developer Meetup - Dec 25</li>
            <li>React Summit - Jan 5</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
