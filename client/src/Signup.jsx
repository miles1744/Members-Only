import { useState } from 'react'
import './App.css'

function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", formData);
      console.log("Logged in:", res.data);
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

  return ( 
    <>
      {locals.user ? (
        <>
          <h1>Welcome Back {user.username}</h1>
          <a href="/log-out"><button>Log Out</button></a> 
        </>
      ):(
        <>
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </>
  )
}

export default Signup;
