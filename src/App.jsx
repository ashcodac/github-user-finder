import { useState } from "react";
import SearchUser from "./components/SearchUser";

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="container">
      <SearchUser onUserFetched={setUserData} />

      {userData && (
        <div className="card mt-4 text-center">
          <img src={userData.avatar_url} alt="Avatar" className="card-img-top" style={{ width: "100px", margin: "auto" }} />
          <div className="card-body">
            <h3 className="card-title">{userData.name}</h3>
            <p className="card-text">{userData.bio}</p>
            <p>
              <strong>Followers:</strong> {userData.followers} | <strong>Following:</strong> {userData.following}
            </p>
            <a href={userData.html_url} target="_blank" className="btn btn-dark">View Profile</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
