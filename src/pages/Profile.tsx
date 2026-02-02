import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-500 mt-2">Gérez vos informations personnelles et vos paramètres.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700"></div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white text-3xl font-bold text-blue-600">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Adresse e-mail
                </label>
                <p className="text-lg font-medium text-gray-900">{user?.email}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Rôles
                </label>
                <div className="flex gap-2 mt-1">
                  {user?.roles.map((role) => (
                    <span 
                      key={role} 
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100"
                    >
                      {role.replace('ROLE_', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Statut du compte</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compte vérifié
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Membre depuis 2026
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
            <button className="px-6 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}