import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/authorize", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user)
        setMemberStatus(res.data.membership_status)

  })
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
