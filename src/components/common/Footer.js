import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; 2024 Liberty Bank. All rights reserved.</p>
                <ul className="footer-links">
                    <li>< Link to="/about">About Us</Link></li>
                    <li>< Link to="/services">Services</Link></li>
                    <li>< Link to="/contact">Contact</Link></li>
                </ul>
                <div className="social-media">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;