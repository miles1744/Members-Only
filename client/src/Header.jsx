import { Link } from "react-router";
import "./App.css"

const Header = () => {

    return (
        <div className="header-container">
            <Link to="/"><h1>Home</h1></Link>
            <Link to="/Clubs"><h1>Clubs</h1></Link>
        </div>
    )
}

export default Header;