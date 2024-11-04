import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Navbar = () => {
    const { isLoggedIn, role, logout } = useAuth();
    
    return (
    <nav className="navbar">
        <div className="container">
            <Link to="/" className="logo">Liberty Bank</Link>
            <ul className="nav-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {isLoggedIn ? (
                        <>  
                            <li><Link onClick={logout} to="/">Logout</Link></li>
                            {role === "WORKER" && (
                            <li><Link to="/worker-dashboard"> Dashboard </Link></li>
                            )}
                            {role === "CLIENT" && (
                            <li><Link to="/client-dashboard" > Dashboard </Link> </li>
                            )}
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}    
            </ul>
        </div>
    </nav>
    );
};

export default Navbar;
