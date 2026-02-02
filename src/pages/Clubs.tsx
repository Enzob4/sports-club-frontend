import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

interface Club {
  "@id": string;
  name: string;
  description: string;
}

interface MyClub {
  id: number;
  userRole: "OWNER" | "MEMBER";
}

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [myClubs, setMyClubs] = useState<MyClub[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([fetchClubs(), fetchMyClubs()]);
    setLoading(false);
  };

  const fetchClubs = async () => {
    try {
      const response = await api.get("/clubs");
      const data =
        response.data["hydra:member"] ||
        response.data["member"] ||
        [];
      setClubs(data);
    } catch (err) {
      console.error("Fetch clubs error", err);
    }
  };

  const fetchMyClubs = async () => {
    try {
      const response = await api.get("/me/clubs");
      setMyClubs(response.data);
    } catch (error) {
      console.error("Fetch my clubs error", error);
    }
  };

  const extractIdFromIri = (iri: string): number => {
    return parseInt(iri.split("/").pop() || "0");
  };

  const getMembership = (clubId: number) => {
    return myClubs.find((c) => c.id === clubId);
  };

  const joinClub = async (clubId: number) => {
    try {
      await api.post(`/clubs/${clubId}/join`);
      await fetchMyClubs();
      alert("Vous avez rejoint le club !");
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("Déjà membre.");
      } else {
        alert("Erreur lors de l'adhésion.");
      }
    }
  };

  const deleteClub = async (clubId: number) => {
  if (!confirm("Voulez-vous vraiment supprimer ce club ?")) return;

  try {
    const response = await api.delete(`/clubs/${clubId}`);
    
    // Le code 204 ou 200 sont des succès
    if (response.status === 204 || response.status === 200) {
      console.log("Suppression réussie !");
      // On rafraîchit les données
      await loadData(); 
      alert("Club supprimé avec succès.");
    }
  } catch (err: any) {
    console.error("Erreur lors de la suppression:", err.response);
    alert(`Erreur : ${err.response?.data?.detail || "Action non autorisée"}`);
  }
};

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/create-club">
        <button>Create Club</button>
      </Link>

      <h1>Liste des Clubs</h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {clubs.map((club) => {
          const clubId = extractIdFromIri(club["@id"]);
          const membership = getMembership(clubId);

          return (
            <div
              key={club["@id"]}
              style={{ border: "1px solid #ccc", padding: 15 }}
            >
              <h3>{club.name}</h3>
              <p>{club.description}</p>

              {/* Pas membre */}
              {!membership && (
                <button onClick={() => joinClub(clubId)}>
                  Rejoindre
                </button>
              )}

              {/* Membre simple */}
              {membership?.userRole === "MEMBER" && (
                <span style={{ color: "green", fontWeight: "bold" }}>✓ Membre</span>
              )}

              {/* Propriétaire */}
              {membership?.userRole === "OWNER" && (
                <>
                  <span style={{ color: "blue", fontWeight: "bold" }}>★ Owner </span>
                  <button
                    style={{ marginLeft: 10, backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}
                    onClick={() => deleteClub(clubId)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
