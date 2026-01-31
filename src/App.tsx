import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Clubs from "./pages/Clubs";
import MyClubs from "./pages/MyClubs";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
