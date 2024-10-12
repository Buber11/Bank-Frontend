import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar'; // Import komponentu Navbar
import LoginPage from './components/loginPage/LoginPage'; // Import strony logowania
import AboutPage from './components/aboutPage/AboutPage';
import Footer from './components/common/Footer';
import ContactPage from './components/contact/ContactPage';
import ServicesPage from './components/service/ServicesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/services" element={<ServicesPage/>} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
