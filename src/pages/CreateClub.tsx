import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateClub() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/clubs", { name, description });
      navigate("/clubs");
    } catch (err: any) {
      console.error("Erreur creation club", err);
      alert(err.response?.data?.detail || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau club</h1>
          <p className="text-gray-500 mt-2">
            Remplissez les informations ci-dessous pour lancer votre communauté sportive.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nom du club
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Les Aigles du Tennis"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez l'ambiance, les horaires, le niveau..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-200 
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                Création en cours...
              </span>
            ) : "Lancer mon club"}
          </button>
        </form>
      </div>
    </div>
  );
}