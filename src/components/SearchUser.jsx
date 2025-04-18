import React from 'react';

const SearchUser = ({ username, setUsername, handleSearch, handleKeyPress }) => {
  return (
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
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchUser;
