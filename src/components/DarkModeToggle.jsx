import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="darkModeToggle"
        checked={darkMode}
        onChange={toggleDarkMode}
        style={{
          cursor: "pointer",
          backgroundColor: darkMode ? "#b0b0b0" : "#b0b0b0",
          width: "40px",
          height: "20px",
        }}
      />
    </div>
  );
};

export default DarkModeToggle;
