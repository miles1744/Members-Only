import { useState } from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom"

function SignupForm() {

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    admin: false
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
  }));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signup", formData);
      alert("Signup successful!");
      navigate("/");  
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Please Sign Up</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label>First Name</label>
        <input 
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="text"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label>Admin Privileges</label>
        <input
          type="checkbox"
          name="admin"
          checked={formData.admin}
          onChange={handleChange}
        />

        <button type="submit" className="btn-signup">Sign Up</button>

        {errors.length > 0 && (
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err.msg}</li>
            ))}
          </ul>
        )}
      </form>
      <p>If you dont already have an account <Link to="/"><b>Sign in</b></Link></p>
    </div>
  );
}

export default SignupForm;
