// import { response } from 'express'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Header = () => {
  // const [username, setusername] = useState(null)
  const {setuserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        // setusername(userInfo.username);
        setuserInfo(userInfo)
      });
    });
  }, [])

  // function logout() {
  //   fetch('http://localhost:4000/logout', {
  //     credentials: 'include',
  //     method: 'POST',
  //   })
  //   // setusername(null);
  //   setuserInfo(null);
  // }

  function logout() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      }).then(() => {
        setuserInfo(null);
      });
    }
  }

  const username = userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">BlogSite</Link>
        {/* <form id="searchForm" action="/search" method="GET">
  <input type="text" name="query" placeholder="Search..." required />
  <button type="submit">Search</button>
</form> */}

        <nav>
          {username && (
            <>
            <span>{username}</span>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header
