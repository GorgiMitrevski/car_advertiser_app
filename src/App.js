import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"; // Link
// components
import Header from './components/header';
import ListCars from './components/car_posts/list-cars';
import PreviewPost from './components/car_posts/preview_post';
// views
import HomeLoggedOut from './views/home-logged-out';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/"
            element={
              <RequireLoginAuth redirectTo="/dashboard">
                <HomeLoggedOut />
              </RequireLoginAuth>
            }
          />
          <Route path="signup"
            element={
              <RequireLoginAuth redirectTo="/dashboard">
                <HomeLoggedOut />
              </RequireLoginAuth>
            }
          />
          <Route path="login"
            element={
              <RequireLoginAuth redirectTo="/dashboard">
                <HomeLoggedOut />
              </RequireLoginAuth>
            }
          />

          <Route path="dashboard"
            element={
              <RequireDashboardAuth redirectTo="/login">
                <ListCars />
              </RequireDashboardAuth>
            }
          />

          <Route path="dashboard/:postId"
            element={
              <RequireDashboardAuth redirectTo="/login">
                <PreviewPost />
              </RequireDashboardAuth>
            }
          />

          <Route path="dashboard/:postId" element={<PreviewPost />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

function RequireLoginAuth( {children, redirectTo} ) {
  let is_authenticated = localStorage.getItem('token') && localStorage.getItem('current_username');

  if(is_authenticated) { // if user logged in navigate to dashboard
    return <Navigate to={'/dashboard'} replace />;
  }

  return children;
}

function RequireDashboardAuth( {children, redirectTo} ) {
  let is_authenticated = localStorage.getItem('token') && localStorage.getItem('current_username');

  if(!is_authenticated) { // if user not logged in navigate to login
    return <Navigate to={'/login'} replace />;
  }

  return children;
}
