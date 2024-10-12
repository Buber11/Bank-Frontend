import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = () => (
    <nav className="navbar">
        <div className="container">
            <Link to="/" className="logo">Liberty Bank</Link>
            <ul className="nav-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
