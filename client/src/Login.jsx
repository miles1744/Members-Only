import { useState, useContext} from 'react'
import './App.css'
import axios from 'axios';
import { Link, Outlet } from 'react-router';
import { UserContext } from "./UserContext.jsx";


function Login() {

  const [formData, setFormData] = useState({ username: "", password: "" });
  const { user, setUser} = useContext(UserContext);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const memberStatus = user?.membership_status === "active";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
         formData,
        { withCredentials: true }
      );
      console.log("Logged in:", res.data);
      setUser(res.data.user)
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/join",
        { passcode: code },
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return ( 
    <>
      {user ? (
        <div>
          <Outlet/>
          {memberStatus ? (
            <div className="home-container">
              <Link to="/create">
                <button className="btn-to-create">Create a new message</button>
              </Link>
            </div>
          ): (
            <div className="join-club-container">
              <h1>Join the club!</h1>
              <input type="password" placeholder="Secret passcode" value={code} onChange={e => setCode(e.target.value)} />
              <button onClick={handleClick}>Become a member</button>
            </div>
          )}
        </div>
      ):(
        <div className="login-container">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Login;
