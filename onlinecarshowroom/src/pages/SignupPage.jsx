import React, { useState } from 'react';
import './register.css';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');

    const handleFnameChange = (event) => {
      setFname(event.target.value);
    };
    const handleLnameChange = (event) => {
      setLname(event.target.value);
    };
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Here you can perform your sign-in logic using the email and password state
      console.log('Sign-Up submitted:', email, password);
      // Reset the form
      setEmail('');
      setPassword('');
    };
  
    return (
        <div className="register-root-container">
        <div className="register-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  value={fname}
                  onChange={handleFnameChange}
                  required
                />
            </div>
            <div className="form-group">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  value={lname}
                  onChange={handleLnameChange}
                  required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
            </div>
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
              <label htmlFor="password">Set password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="sign-up-link">
                <span>Already have an account? <a href="/login">Sign in</a> here!</span>
            </div>
            <div className="register-button">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    );
}
