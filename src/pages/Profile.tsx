import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

interface Club {
  id: number;
  name: string;
  description: string;
  role: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await api.get("/me/clubs");
      setClubs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>

      <div style={{ marginBottom: 20 }}>
        <h3>Email</h3>
        <p>{user.email}</p>

        <h3>Roles</h3>
        <ul>
          {user.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>My Clubs</h2>

        {loading ? (
          <p>Loading...</p>
        ) : clubs.length === 0 ? (
          <p>You are not a member of any club.</p>
        ) : (
          clubs.map((club) => (
            <div
              key={club.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <strong>{club.name}</strong>
              <p>{club.description}</p>
              <p>Role: {club.userRole}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
