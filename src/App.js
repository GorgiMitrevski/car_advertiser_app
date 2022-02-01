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
          {/* TODO: change this in one path*/}
          <Route path="/"
            element={
              <RequireAuth redirectTo="/dashboard">
                <HomeLoggedOut />
              </RequireAuth>
            }
          />
          <Route path="/signup"
            element={
              <RequireAuth redirectTo="/dashboard">
                <HomeLoggedOut />
              </RequireAuth>
            }
          />
          <Route path="/login"
            element={
              <RequireAuth redirectTo="/dashboard">
                <HomeLoggedOut />
              </RequireAuth>
            }
          />

          <Route path="/dashboard"
            element={
              <RequireAuth redirectTo="/login">
                <ListCars />
              </RequireAuth>
            }
          />

          <Route path="dashboard/:postId" element={<PreviewPost />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

function RequireAuth( {children, redirectTo} ) {
  let is_user_logged_in = localStorage.getItem('token');
  let current_username = localStorage.getItem('current_username');

  // if(redirectTo == '/login' && !is_user_logged_in || !current_username) {
  //   return <Navigate to={redirectTo} replace />;
  // } 
  //else
  // if(redirectTo == '/dashboard' && is_user_logged_in && current_username) {
  //   return <Navigate to={redirectTo} replace />;
  // }

  return children;
}
