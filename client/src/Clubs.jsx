import { useState, useEffect} from "react";
import { Outlet } from "react-router";
import "./App.css"

const Clubs = () => {
    [clubs, setClubs] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
        try {
          await axios.get("http://localhost:3000/Clubs", {
            withCredentials: true
          });
          setClubs(res.data)
        } catch (err) {
          console.error("Logout failed:", err);
        }
      };

      fetchClubs();
    }, []);

    return (
        <div>
            <Outlet/>

        </div>
    )
}

export default Clubs;