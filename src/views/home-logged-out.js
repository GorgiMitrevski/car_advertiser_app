import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import SignUp from '../components/signup';
import LogIn from '../components/login';

function HomeLoggedOut() {
  const location = useLocation();
  const navigate = useNavigate();

  let current_tab_onloading = location.pathname == '/login' ? '/login' : '/signup';
  let [current_tab, setTab] = useState(current_tab_onloading);

  const setActiveTab = tab => {
    setTab(tab);
    navigate(tab, { replace: true });
  }

  return (
    <div className="home-logged-out">
      <button
        className={`custom-btn tab-btn ${current_tab == '/signup' ? 'active-tab-btn' : ''}`}
        onClick={ () => { setActiveTab('/signup') } }
      > Sign Up </button>
      <button
        className={`custom-btn tab-btn ${current_tab == '/login' ? 'active-tab-btn' : ''}`}
        onClick={ () => { setActiveTab('/login') } }
      > Log In </button>
      
      {current_tab == '/signup' ?
        <SignUp />
        :
        <LogIn />
      }
    </div>
  );
}

export default HomeLoggedOut;
