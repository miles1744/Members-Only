import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from './SignUp.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignupForm />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
