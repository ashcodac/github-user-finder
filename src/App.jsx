import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchUser from "./components/SearchUser";
import UserRepos from "./components/UserRepos";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0); // Time to retry in seconds

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1e1e1e" : "#f5f5f5";
  }, [darkMode]);

  const fetchUserData = async () => {
    try {
      setError(null);
      setUserData(null);
      setRepos([]);
      setLoading(true); // Start loading when fetch begins

      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      
      // Check if the rate limit is exceeded
      if (userResponse.status === 403) {
        const retryAfterHeader = userResponse.headers.get("Retry-After");
        if (retryAfterHeader) {
          const retryAfterSeconds = parseInt(retryAfterHeader, 10);
          setRateLimitExceeded(true);
          setRetryAfter(retryAfterSeconds);
        } else {
          setRateLimitExceeded(true);
          setRetryAfter(3600); // Default to 1 hour if no Retry-After header is provided
        }
        throw new Error("Rate limit exceeded. Please try again later.");
      }

      if (!userResponse.ok) throw new Error("User not found");
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading once data has been fetched
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
      {/* Logo at the top */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <img
          src={darkMode ? "/github-user-dark.png" : "/github-user.png"}
          alt="Logo"
          style={{ width: "150px", height: "auto" }}
        />
        {/* Dark mode toggle button */}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={{
              cursor: "pointer",
              backgroundColor: darkMode ? "#b0b0b0" : "#b0b0b0",
              width: "40px",
              height: "20px",
            }}
          />
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" onClick={handleSearch} disabled={rateLimitExceeded}>
            Search
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Rate Limit Exceeded Message */}
      {rateLimitExceeded && (
        <p className="text-danger text-center">
          Rate limit exceeded. Please try again after one hour.
        </p>
      )}

      {/* User Profile Card */}
      {userData && !loading && (
        <div className={`card p-3 mb-4 ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}>
          <div className="d-flex align-items-center">
            <img
              src={userData.avatar_url}
              alt="Profile"
              className="rounded-circle me-3"
              width={80}
            />
            <div>
              <h4>{userData.name || userData.login}</h4>
              <p className="mb-1">
                <strong>Followers:</strong> {userData.followers} |{" "}
                <strong>Following:</strong> {userData.following}
              </p>
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
        </div>
      )}

      {/* User Repositories */}
      {userData && !loading && <UserRepos username={userData.login} darkMode={darkMode} />}
    </div>
  );
};

export default App;
