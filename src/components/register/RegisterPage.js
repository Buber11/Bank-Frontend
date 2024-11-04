import React, { useState } from 'react';
import './RegisterPage.css';

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

    const [errors, setErrors] = useState({}); // Stan na błędy

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset błędu, gdy użytkownik edytuje pole
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Zapobiega domyślnej akcji formularza

        try {
            const response = await fetch('https://localhost:8443/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Sprawdzamy, czy odpowiedź nie jest ok
            if (!response.ok) {
                const errorData = await response.json();

                // Ustawiamy błędy na podstawie odpowiedzi serwera
                const errorMessages = errorData.errors.reduce((acc, curr) => {
                    const [field, message] = curr.split(' - '); // Rozdziel pole i komunikat
                    acc[field] = message; // Przypisz komunikat do odpowiedniego pola
                    return acc;
                }, {});

                setErrors(errorMessages); // Ustaw błędy
                return;
            }

            const data = await response.json();
            console.log('Success:', data); // Dalsze przetwarzanie danych
            setErrors({}); // Resetowanie błędów po pomyślnym przesłaniu
        } catch (error) {
            console.error('Error:', error); // Obsługuje błąd
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
                        {errors.username && <p className="error">{errors.username}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={handleChange} />
                        {errors.password && <p className="error">{errors.password}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
                        {errors.firstName && <p className="error">{errors.firstName}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
                        {errors.lastName && <p className="error">{errors.lastName}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="countryOfOrigin">Country of Origin</label>
                        <input type="text" id="countryOfOrigin" name="countryOfOrigin" required onChange={handleChange} />
                        {errors.countryOfOrigin && <p className="error">{errors.countryOfOrigin}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Mobile Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" required onChange={handleChange} />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="pesel">PESEL</label>
                        <input type="text" id="pesel" name="pesel" required onChange={handleChange} />
                        {errors.pesel && <p className="error">{errors.pesel}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sex">Sex</label>
                        <select id="sex" name="sex" required onChange={handleChange}>
                            <option value="">Select your sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.sex && <p className="error">{errors.sex}</p>} {/* Wyświetlanie błędu */}
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
