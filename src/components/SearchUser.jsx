import { useState } from "react";
import axios from "axios";

const SearchUser = ({ onUserFetched }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!username) return;
    setError(null); // Reset error before fetching

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      onUserFetched(response.data); // Send data to parent component
    } catch (err) {
      setError("User not found! Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">GitHub User Finder</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchUser}>
          Search
        </button>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
    </div>
  );
};

export default SearchUser;
