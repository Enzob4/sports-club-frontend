import { useEffect, useState } from "react";
import api from "../api/axios";

interface Club {
  "@id": string; 
  name: string;
  description: string;
}

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await api.get("/clubs");
      const data = response.data["member"] || response.data["hydra:member"] || [];
      setClubs(data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const joinClub = async (clubIri: string) => {
    try {
      const id = clubIri.split("/").pop(); 
      
      await api.post(`/clubs/${id}/join`);
      alert("Félicitations, vous avez rejoint le club !");
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("Vous êtes déjà membre.");
      } else {
        alert("Erreur lors de l'adhésion.");
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des Clubs</h1>
      <div style={{ display: "grid", gap: "20px" }}>
        {clubs.map((club) => (
          <div key={club["@id"]} style={{ border: "1px solid #ccc", padding: 15 }}>
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <button onClick={() => joinClub(club["@id"])}>
              Rejoindre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}