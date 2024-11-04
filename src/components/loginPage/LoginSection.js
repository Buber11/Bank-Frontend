import React, { useState } from 'react';
import FormGroup from './FormGroup';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://localhost:8443/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        const userRole = data.role; 
        login(userRole); 
        navigate('/'); 
      } else {
        console.error("Błąd logowania:", response.statusText);
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
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
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;
