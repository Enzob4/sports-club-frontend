import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyClubs() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyClubs();
  }, []);

  const fetchMyClubs = async () => {
    try {
      const response = await api.get("/me/clubs");
      setClubs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erreur lors de la récupération de mes clubs", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement de mes clubs...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Clubs</h1>
      {clubs.length === 0 ? (
        <p>Vous n'avez rejoint aucun club pour le moment.</p>
      ) : (
        clubs.map((membership) => (
          <div key={membership.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
            <strong>{membership.name}</strong> — Role: <em>{membership.userRole || membership.role}</em>
          </div>
        ))
      )}
    </div>
  );
}