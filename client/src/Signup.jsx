import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function SignupForm() {

  const navigate = useNavigate();               

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Email"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>

      {errors.length > 0 && (
        <ul>
          {errors.map((err, i) => (
            <li key={i}>{err.msg}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SignupForm;
