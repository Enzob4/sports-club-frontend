import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Clubs from "./pages/Clubs";
import MyClubs from "./pages/MyClubs";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";
import CreateClub from "./pages/CreateClub";
import Layout from "./components/Layout";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <Auth /> : <Navigate to="/clubs" />} 
        />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/my-clubs" element={<MyClubs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-club" element={<CreateClub />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;