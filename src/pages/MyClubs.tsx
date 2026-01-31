import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyClubs() {
  const [clubs, setClubs] = useState<any[]>([]);

  useEffect(() => {
    fetchMyClubs();
  }, []);

  const fetchMyClubs = async () => {
    const response = await api.get("/memberships");
    setClubs(response.data["hydra:member"]);
  };

  return (
    <div>
      <h1>My Clubs</h1>
      {clubs.map((membership) => (
        <div key={membership.id}>
          {membership.club.name} - {membership.role}
        </div>
      ))}
    </div>
  );
}
