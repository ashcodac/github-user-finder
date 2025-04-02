import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1e1e1e" : "#f5f5f5";
  }, [darkMode]);

  const fetchUserData = async () => {
    try {
      setError(null);
      setUserData(null);
      setRepos([]);

      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error("User not found");
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = () => {
    if (username.trim()) {
      fetchUserData();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`container mt-5 p-4 rounded ${darkMode ? "text-light bg-dark" : "text-dark bg-light"}`} style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>GitHub User Finder</h2>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={{
              cursor: "pointer",
              backgroundColor: darkMode ? "#b0b0b0" : "b0b0b0",
              width: "40px",
              height: "20px",
              appearance: "none",
              outline: "none",
              boxShadow: "none",
              backgroundClip: "padding-box",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className={`btn ${darkMode ? "btn-secondary" : "btn-outline-dark"}`}
          onClick={handleSearch}
          style={{ border: darkMode ? "none" : "1px solid #333" }}
        >
          Search
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {userData && (
        <div className={`card p-3 ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}>
          <div className="d-flex align-items-center">
            <img
              src={userData.avatar_url}
              alt="Profile"
              className="rounded-circle me-3"
              width={80}
            />
            <div>
              <h4>{userData.name || userData.login}</h4>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${darkMode ? "btn-dark" : "btn-light"} profile-btn`}
              >
                View Full Profile
              </a>
            </div>
          </div>

          <h5 className="mt-4">Repositories</h5>
          <ul className="list-group">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <li key={repo.id} className={`list-group-item ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`repo-link ${darkMode ? "text-info" : "text-primary"}`}
                  >
                    {repo.name}
                  </a>
                </li>
              ))
            ) : (
              <p>No repositories found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
