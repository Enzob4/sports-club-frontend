import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(); 
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="w-full px-6 mx-auto px-6 h-16 grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-black text-lg tracking-tight hidden sm:block">SPORT CLUB API</span>
          </Link>
        </div>

        <div className="flex justify-center gap-6">
          <Link 
            to="/clubs" 
            className={`text-sm font-semibold transition-colors ${isActive('/clubs') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Liste des clubs
          </Link>
          <Link 
            to="/my-clubs" 
            className={`text-sm font-semibold transition-colors ${isActive('/my-clubs') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Mes Clubs
          </Link>
        </div>

        <div className="flex justify-end items-center gap-4">
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider"
          >
            Déconnexion
          </button>
          
          <Link to="/profile" className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-100 transition-all">
            <span className="text-xs font-bold text-gray-600">U</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}