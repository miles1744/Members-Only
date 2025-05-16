import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import Header from './Header.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from './SignUp.jsx';
import Clubs from './Clubs.jsx';
import { UserProvider } from "./UserContext.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login/>}>
          <Route index={true} element={<Header/>} />
        </Route>

        <Route path="/signup" element={<SignupForm />}/>

        <Route path="/Clubs" element={<Clubs/>}>
          <Route index={true} element={<Header/>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
