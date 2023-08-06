import "./register.css";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Here you can perform your sign-in logic using the email and password state
      console.log('Sign-in submitted:', email, password);
      // Reset the form
      setEmail('');
      setPassword('');
    };
  
    return (
        <div className="register-root-container">
        <div className="register-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="sign-up-link">
            <span>
            Don't have an account? <Link to="/signup">Sign up</Link> here!
          </span>
            </div>
            <div className="register-button">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    );
}