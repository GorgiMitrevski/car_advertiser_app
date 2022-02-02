import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import Header from './components/header';
// views
import HomeLoggedOut from './views/home-logged-out';
import ListCars from './views/dashboard-list-cars.js';
import PreviewPost from './views/preview-post';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/"
            element={
              <RequireLoginAuth>
                <HomeLoggedOut />
              </RequireLoginAuth>
            }
          />
          <Route path="signup"
            element={
              <RequireLoginAuth>
                <HomeLoggedOut />
              </RequireLoginAuth>
            }
          />
          <Route path="login"
            element={
              <RequireLoginAuth>
                <HomeLoggedOut />
              </RequireLoginAuth>
            }
          />

          <Route path="dashboard"
            element={
              <RequireDashboardAuth>
                <ListCars />
              </RequireDashboardAuth>
            }
          />

          <Route path="dashboard/:postId"
            element={
              <RequireDashboardAuth>
                <PreviewPost />
              </RequireDashboardAuth>
            }
          />

          <Route path="dashboard/:postId" element={<PreviewPost />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

// Authentications for routes
function RequireLoginAuth( {children} ) {
  let is_authenticated = localStorage.getItem('token') && localStorage.getItem('current_username');

  if(is_authenticated) { // if user logged in navigate to dashboard
    return <Navigate to={'/dashboard'} replace />;
  }

  return children;
}

function RequireDashboardAuth( {children} ) {
  let is_authenticated = localStorage.getItem('token') && localStorage.getItem('current_username');

  if(!is_authenticated) { // if user not logged in navigate to login
    return <Navigate to={'/login'} replace />;
  }

  return children;
}
