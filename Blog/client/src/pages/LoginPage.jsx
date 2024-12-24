import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [redirect, setredirect] = useState(false)
  const { setuserInfo } = useContext(UserContext)

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    })
    // if(response.status === 200) {
    //   alert('login successful');
    // } else {
    //   alert('login failed');
    // }
    if (response.ok) {
      response.json().then(userInfo => {
        setuserInfo(userInfo);
        setredirect(true);   
      })
    }
    else {
      alert('Wrong Credentials');
    }

  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>
      <input type="text" placeholder="username" value={username} onChange={ev => setusername(ev.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={ev => setpassword(ev.target.value)} />
      <button>Login</button>
    </form>
  )
}

export default LoginPage
