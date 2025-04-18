import React from 'react';

const UserCard = ({ userData, darkMode }) => {
  return (
    userData && (
      <div className={`card p-3 mb-4 ${darkMode ? 'bg-secondary text-light' : 'bg-light text-dark'}`}>
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
              className={`btn ${darkMode ? 'btn-dark' : 'btn-light'} profile-btn`}
            >
              View Full Profile
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
