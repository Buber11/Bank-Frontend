import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, role, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Liberty Bank</Link>
                {/* Lista menu */}
                <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact-us">Contact</Link></li>
                    {isLoggedIn ? (
                        <>
                            {role !== "WORKER" && (
                                <li><Link to="/client-dashboard">Dashboard</Link></li>
                            )}
                            {role === "WORKER" && (
                                <li><Link to="/worker-dashboard">Dashboard</Link></li>
                            )}
                            <li><Link onClick={logout} to="/">Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
                {/* Przycisk hamburgera */}
                <div className={`hamburger ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
