import { Outlet, useNavigate } from "react-router"
import { useState, useContext } from "react";
import { UserContext } from "./UserContext.jsx";



const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
        return null;
      }

    return(
        <>
        <Outlet/>
        
        </>
    )
}

export default Home;