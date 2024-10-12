// src/Components/AboutPage/About.js
import React from 'react';
import './AboutPage.css'; // Import the CSS for the About page

const About = () => {
    return (
        <div className="about-container">
            <h1>About Liberty Bank</h1>
            <p>
                Welcome to <span className="highlight">Liberty Bank</span>, where we believe in empowering our customers
                through financial education and personalized banking solutions.
            </p>
            <p>
                At Liberty Bank, we are dedicated to providing innovative services that cater to your unique financial
                needs. Whether you're looking to save for the future, buy a home, or invest wisely, our team of experts is here
                to guide you every step of the way.
            </p>
            <p>
                Our mission is to foster a community of financially informed individuals who can make educated decisions
                regarding their finances. We take pride in our commitment to customer service and strive to build lasting
                relationships with our clients.
            </p>
            <p>
                Join us at Liberty Bank and experience the difference of a bank that truly cares about your financial
                well-being.
            </p>
        </div>
    );
};

export default About;
