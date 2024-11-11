import React, { useState } from 'react';
import FormGroup from './FormGroup';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Nowy stan dla błędów
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
      code: code,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const userRole = data.role; 
        login(userRole); 
        navigate('/');
      } else {
        const errorData = await response.json(); // Zakładając, że serwer zwraca JSON z błędem
        const errorMsg = errorData.message || "Wprowadzone dane są niepoprawne."; // Ustawienie komunikatu błędu

        setErrorMessage(errorMsg); // Ustawienie komunikatu błędu

        // Dodatkowa logika, aby sprawdzić, czy komunikat o błędzie jest pusty
        if (errorData.message === '') {
          setErrorMessage("Wprowadzone dane są niepoprawne."); // Domyślny komunikat, gdy serwer zwraca pusty ciąg
        }
        
        console.error("Błąd logowania:", errorMsg);
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
      setErrorMessage("Wystąpił błąd podczas logowania."); // Ustawienie komunikatu błędu w przypadku błędu sieci
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormGroup
            label="Code"
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;
