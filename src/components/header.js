import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  let [user_logged_in, setUserStatus] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const checkLoginStatus = () => {
    let current_user_status = localStorage.getItem('current_username') && localStorage.getItem('token') ? true : false;
    setUserStatus(current_user_status);
  }

  const logoutUser = () => {
    setUserStatus(false);
    localStorage.removeItem('current_username');
    localStorage.removeItem('token');
    navigate('/');
  }

  const renderLoggedInTabs = () => {
    return (
      <>
        <li> <Link to="/dashboard"> Dashboard </Link> </li>
        <li className="right-item">
          <a className="header-log-btn" onClick={logoutUser}> Logout </a>
        </li>
      </>
    );
  };

  const renderLoggedOutTabs = () => {
    return (
      <>
        <li> <Link to="/signup"> Sign up </Link> </li>
      </>
    );
  }

  console.log('user_logged_in: ', user_logged_in);

  return (
    <header className="app-header">
      <ul>
        {user_logged_in ?
          renderLoggedInTabs()
        :
          renderLoggedOutTabs()
        }
      </ul>
    </header>
  );
}

export default Header;

