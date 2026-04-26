import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await res.json();

        setRepositories(data.repositories || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load repositories");
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/all`);
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

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="dasSection">
      <Navbar />

      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>

          {suggestedRepositories.length === 0 ? (
            <p>No suggestions</p>
          ) : (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description || "No description"}</p>
              </div>
            ))
          )}
        </aside>

        {/* MAIN */}
        <main>
          <h2>Your Repositories</h2>

          <div id="search">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredRepos.length === 0 ? (
            <p>No repositories found</p>
          ) : (
            filteredRepos.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                {/* <p>{repo.description || "No description"}</p> */}
              </div>
            ))
          )}
        </main>

        {/* RIGHT */}
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;
