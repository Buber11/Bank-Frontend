// src/Components/ContactPage/Contact.js
import React from 'react';
import './ContactPageUs.css'; // Import the CSS for the Contact page

const ContactPageUs = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
        </div>
    );
};

export default ContactPageUs;
