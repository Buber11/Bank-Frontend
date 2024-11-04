import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar'; // Import komponentu Navbar
import LoginPage from './components/loginPage/LoginPage'; // Import strony logowania
import AboutPage from './components/aboutPage/AboutPage';
import Footer from './components/common/Footer';
import ContactPage from './components/contact/ContactPage';
import ServicesPage from './components/service/ServicesPage';
import RegisterPage from './components/register/RegisterPage';
import { useAuth } from './AuthContext';
import EmployeeList from './components/employeelist/EmployeeList';
import ClientDashboard from './components/clientDashBoard/ClientDashboard';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = () => {
  const location = useLocation();
  const { role } = useAuth();

  // Ścieżki, dla których navbar ma być ukryty
  const hiddenNavbarPaths = [""];
  const shouldShowNavbar = !hiddenNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/about" />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage></LoginPage>} />

        {role === "WORKER" && (
          <Route path="/worker-dashboard" element={<EmployeeList/>} />
        )}
        {role === "CLIENT" && (
          <Route path="/client-dashboard" element={<ClientDashboard/>} />
        )}
        {role === "COMPANY" && (
          <Route path="/company-dashboard" />
        )}
        
      </Routes>
      <Footer />
    </>
  );
};

export default App;