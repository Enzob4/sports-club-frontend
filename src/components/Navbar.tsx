import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/clubs">Clubs</Link> |{" "}
      <Link to="/my-clubs">My Clubs</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
