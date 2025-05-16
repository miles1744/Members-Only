import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
import "./App.css";

export default function Header() {
  const { setUser } = useContext(UserContext);
  const navigate     = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="header-container">
      <Link to="/"><h1>Home</h1></Link>
      <Link to="/clubs"><h1>Clubs</h1></Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
