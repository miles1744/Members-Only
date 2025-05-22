import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
  user: null,
  status: "loading",       // "loading" | "ready"
  setUser: () => {},
  setStatus: () => {}
});

export function UserProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get("http://localhost:3000/authorize", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setStatus("ready"));
  }, []);

  

  return (
    <UserContext.Provider value={{ user, status, setUser, setStatus }}>
      {children}
    </UserContext.Provider>
  );
}
