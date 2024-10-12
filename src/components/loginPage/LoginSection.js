import React from 'react';
import FormGroup from './FormGroup';

const LoginSection = () => (
    <section className="login-section">
        <div className="login-container">
            <h2>Login</h2>
            <form action="/login" method="post">
                <FormGroup label="Username" type="text" id="username" name="username" />
                <FormGroup label="Password" type="password" id="password" name="password" />
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    </section>
);

export default LoginSection;
