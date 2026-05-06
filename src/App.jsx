import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers");
      const result = await res.json();

      setUsers(result.data.data);
    } catch (err) {
      setError("Something went wrong while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <h2>Loading users...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="app">
      <h1>Random Users Directory</h1>
      <button onClick={fetchUsers}>Refresh Users</button>

      <div className="user-grid">
        {users.map((user) => (
          <div className="user-card" key={user.login.uuid}>
            <img src={user.picture.large} alt={user.name.first} />

            <h2>
              {user.name.title} {user.name.first} {user.name.last}
            </h2>

            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Username:</strong> {user.login.username}</p>
            <p><strong>Age:</strong> {user.dob.age}</p>
            <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;