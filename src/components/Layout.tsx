import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar /> 
      <main className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-10">
        <Outlet /> 
      </main>

      <footer className="py-8 border-t border-gray-100 bg-white text-center text-gray-400 text-sm">
        &copy; 2026 Enzo Blois
      </footer>
    </div>
  );
}