import React from 'react';
import './ServicesPage.css';

const Services = () => {
    return (
        <div className="services-page">
            <header>
                <h1>Our Services</h1>
                <p>Discover the variety of financial services tailored to your needs.</p>
            </header>
            <div className="services-container">
                <div className="service-item">
                    <h3>Personal Banking</h3>
                    <p>Manage your finances with ease using our personal banking services.</p>
                </div>
                <div className="service-item">
                    <h3>Business Banking</h3>
                    <p>Support your business growth with our comprehensive banking solutions.</p>
                </div>
                <div className="service-item">
                    <h3>Investment Services</h3>
                    <p>Invest in your future with our tailored investment options.</p>
                </div>
                <div className="service-item">
                    <h3>Loans and Mortgages</h3>
                    <p>Access funds for personal, business, or real estate purposes.</p>
                </div>
                <div className="service-item">
                    <h3>Insurance</h3>
                    <p>Protect your assets and future with our range of insurance plans.</p>
                </div>
                <div className="service-item">
                    <h3>Online Banking</h3>
                    <p>Enjoy secure and convenient access to your accounts anytime, anywhere.</p>
                </div>
            </div>
        </div>
    );
};

export default Services;
