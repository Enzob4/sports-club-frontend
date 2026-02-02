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
    try {
      await Promise.all([fetchClubs(), fetchMyClubs()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClubs = async () => {
  const response = await api.get("/clubs");
  const data = response.data["hydra:member"] || response.data["member"] || response.data;
  setClubs(Array.isArray(data) ? data : []);
};

  const fetchMyClubs = async () => {
    const response = await api.get("/me/clubs");
    setMyClubs(response.data);
  };

  const extractIdFromIri = (iri: string): number => parseInt(iri.split("/").pop() || "0");

  const joinClub = async (clubId: number) => {
    try {
      await api.post(`/clubs/${clubId}/join`);
      await fetchMyClubs();
    } catch (err: any) {
      alert(err.response?.status === 409 ? "Déjà membre." : "Erreur lors de l'adhésion.");
    }
  };

  const handleDelete = async (clubId: number) => {
    if (!confirm("Voulez-vous supprimer ce club définitivement ?")) return;
    try {
      await api.delete(`/clubs/${clubId}`);
      setClubs(prev => prev.filter(c => extractIdFromIri(c["@id"]) !== clubId));
    } catch {
      alert("Action non autorisée.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Liste des Clubs</h1>
          <p className="text-gray-500 mt-1">Découvrez et rejoignez les communautés sportives.</p>
        </div>
        <Link to="/create-club">
          <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all active:scale-95">
            <span className="mr-2">+</span> Créer un club
          </button>
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => {
          const clubId = extractIdFromIri(club["@id"]);
          const membership = myClubs.find((c) => c.id === clubId);

          return (
            <div key={club["@id"]} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                    {club.name.charAt(0)}
                  </div>
                  {membership?.userRole === "OWNER" && (
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">
                      Propriétaire
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {club.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {club.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                {/* Logic Boutons */}
                {!membership ? (
                  <button 
                    onClick={() => joinClub(clubId)}
                    className="w-full py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Rejoindre le club
                  </button>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span className="inline-flex items-center text-sm font-medium text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      Membre
                    </span>
                    
                    {membership.userRole === "OWNER" && (
                      <button 
                        onClick={() => handleDelete(clubId)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors"
                        title="Supprimer le club"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}