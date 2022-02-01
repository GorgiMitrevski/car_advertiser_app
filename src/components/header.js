import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  let current_user_status = localStorage.getItem('current_user') ? true : false;
  console.log('current_user_status: ', current_user_status);
  let [user_logged_in, setUserStatus] = useState(current_user_status);

  const logoutUser = () => {
    console.log('user_logged_in: ', user_logged_in);
    setUserStatus(false);
    // TODO: do functionality for login(navigate to login) and logout(remove login user from localStorage)
    localStorage.removeItem('current_user');
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

