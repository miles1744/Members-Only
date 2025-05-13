import { useState } from 'react'
import './App.css'

function Login() {

  return ( 
    <>
      {locals.user ? (
        <>
          <h1>Welcome Back {user.username}</h1>
          <a href="/log-out"><button>Log Out</button></a> 
        </>
      ):(

      )}
    </>
  )
}

export default Login;
