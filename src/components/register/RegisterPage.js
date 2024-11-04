import React, { useState } from 'react';
import './RegisterPage.css';
import QRCode from 'react-qr-code';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        countryOfOrigin: '',
        phoneNumber: '',
        pesel: '',
        sex: '',
    });

    const [errors, setErrors] = useState({}); 
    const [qrValue, setQrValue] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://localhost:8443/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            
            console.log('Response status:', response.status);
            const text = await response.text(); 
            console.log('Response body:', text); 
    
            if (!response.ok) {
                const errorData = JSON.parse(text);
                const errorMessages = errorData.errors.reduce((acc, curr) => {
                    const [field, message] = curr.split(' - ');
                    acc[field] = message;
                    return acc;
                }, {});
    
                setErrors(errorMessages);
                return;
            }
    
            console.log('Success:', text);
            setQrValue(text); 
            setErrors({});
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-page">
            <header>
                <h1>Create an Account</h1>
                <p>Join Liberty Bank today and start managing your finances with ease.</p>
            </header>
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required onChange={handleChange} />
                        {errors.username && <p className="error">{errors.username}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={handleChange} />
                        {errors.password && <p className="error">{errors.password}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
                        {errors.firstName && <p className="error">{errors.firstName}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
                        {errors.lastName && <p className="error">{errors.lastName}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="countryOfOrigin">Country of Origin</label>
                        <input type="text" id="countryOfOrigin" name="countryOfOrigin" required onChange={handleChange} />
                        {errors.countryOfOrigin && <p className="error">{errors.countryOfOrigin}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Mobile Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" required onChange={handleChange} />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="pesel">PESEL</label>
                        <input type="text" id="pesel" name="pesel" required onChange={handleChange} />
                        {errors.pesel && <p className="error">{errors.pesel}</p>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="sex">Sex</label>
                        <select id="sex" name="sex" required onChange={handleChange}>
                            <option value="">Select your sex</option>
                            <option value="man">Male</option>
                            <option value="woman">Female</option>
                        </select>
                        {errors.sex && <p className="error">{errors.sex}</p>} 
                    </div>
                    <button type="submit" className="register-button">Register</button>
                    {qrValue && ( 
                    <div className="qr-code-container">
                        <h2>Your Barcode QR Code:</h2>
                        <QRCode value={qrValue} /> 
                    </div>
                )}
                </form>
            </div>
        </div>
    );
};

export default Register;
