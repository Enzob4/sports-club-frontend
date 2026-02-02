import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Clubs from "./pages/Clubs";
import MyClubs from "./pages/MyClubs";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import CreateClub from "./pages/CreateClub";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
        {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route
          path="/clubs"
          element={
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-clubs"
          element={
            <ProtectedRoute>
              <MyClubs />
            </ProtectedRoute>
          }
        />
        <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-club"
        element={
          <ProtectedRoute>
            <CreateClub />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
