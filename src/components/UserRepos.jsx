import { useEffect, useState } from "react";
import axios from "axios";

const UserRepos = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
      } catch (err) {
        setError("Failed to load repositories.");
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <div className="mt-4">
      <h4 className="text-center">Repositories</h4>
      {error && <p className="text-danger text-center">{error}</p>}
      <ul className="list-group">
        {repos.slice(0, 5).map((repo) => (
          <li key={repo.id} className="list-group-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;
