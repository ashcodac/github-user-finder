import React from 'react';

const UserRepos = ({ username, darkMode }) => {
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error("Unable to fetch repositories.");
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return (
    <div>
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

      {/* Repository List */}
      {!loading && !error && repos.length > 0 && (
        <ul className="list-group">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className={`list-group-item ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* No Repositories Message */}
      {!loading && !error && repos.length === 0 && (
        <p className="text-center">No repositories found for this user.</p>
      )}
    </div>
  );
};

export default UserRepos;
