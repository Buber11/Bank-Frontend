import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar'; // Import komponentu Navbar
import LoginPage from './components/loginPage/LoginPage'; // Import strony logowania
import AboutPage from './components/aboutPage/AboutPage';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage/>} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
