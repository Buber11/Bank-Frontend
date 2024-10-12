import React from 'react';
import './RegisterPage.css';

const Register = () => {
    return (
        <div className="register-page">
            <header>
                <h1>Create an Account</h1>
                <p>Join Liberty Bank today and start managing your finances with ease.</p>
            </header>
            <div className="register-container">
                <form className="register-form" action="/register" method="post">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="motherMaidenName">Mother's Maiden Name</label>
                        <input type="text" id="motherMaidenName" name="motherMaidenName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthDate">Date of Birth</label>
                        <input type="date" id="birthDate" name="birthDate" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthPlace">Place of Birth</label>
                        <input type="text" id="birthPlace" name="birthPlace" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="citizenship">Citizenship</label>
                        <input type="text" id="citizenship" name="citizenship" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pesel">PESEL</label>
                        <input type="text" id="pesel" name="pesel" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idNumber">ID Card Number</label>
                        <input type="text" id="idNumber" name="idNumber" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Mobile Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="residentialAddress">Residential Address</label>
                        <input type="text" id="residentialAddress" name="residentialAddress" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correspondenceAddress">Correspondence Address</label>
                        <input type="text" id="correspondenceAddress" name="correspondenceAddress" required />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
