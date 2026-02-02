import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Clubs</h1>
          <p className="text-gray-500 mt-1">Les communautés dont vous faites partie.</p>
        </div>
        <Link 
          to="/create-club" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100"
        >
          + Créer un club
        </Link>
      </header>

      {clubs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
          <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Aucun club trouvé</h3>
          <p className="text-gray-500 mb-6">Vous n'avez rejoint aucun club pour le moment.</p>
          <Link to="/clubs" className="text-blue-600 font-bold hover:underline italic">
            Parcourir les clubs disponibles →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((membership) => (
            <div 
              key={membership.id} 
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {membership.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                  (membership.userRole || membership.role) === 'owner' 
                  ? 'bg-amber-50 text-amber-700 border-amber-100' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                }`}>
                  {membership.userRole || membership.role}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                {membership.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {membership.description || "Aucune description fournie pour ce club."}
              </p>
              
              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-lg transition-colors uppercase tracking-wide">
                Gérer le club
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}