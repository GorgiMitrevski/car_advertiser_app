import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Link
// components
import Header from './components/header';
import SignUp from './components/signup';
import LogIn from './components/login';
import ListCars from './components/car_posts/list_cars';
import PreviewPost from './components/car_posts/preview_post';
// views
import HomeLoggedOut from './views/home-logged-out';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomeLoggedOut />}/>
          <Route path="signup" element={<HomeLoggedOut />}/>
          <Route path="login" element={<HomeLoggedOut />}/>

          <Route path="dashboard" element={<ListCars />} />
          <Route path="dashboard/:postId" element={<PreviewPost />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
