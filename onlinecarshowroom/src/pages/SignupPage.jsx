import React, { useState } from 'react';
import axios from 'axios'
import './register.css';


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSuccessfull, setisSuccessfull] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
          const response = await axios.post('http://localhost:5000/user/signup', {
              email,
              password,
              phone,
              name
          });
    
          if (response.status === 200) {
              // Navigate to a protected route (e.g., user dashboard)
              // Replace '/dashboard' with the appropriate route
              setisSuccessfull(true)
          } else {
              console.log('Authentication failed');
          }
      } catch (error) {
          if (error.response) {
              console.log('Authentication failed:', error.response.data.error);
          } else if (error.request) {
              console.log('Request made, but no response received:', error.request);
          } else {
              console.log('Error occurred:', error.message);
          }
      }
    
      // Reset the form
      setEmail('');
      setPassword('');
    };

    const handleNameChange = (event) => {
      setName(event.target.value);
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
  
    return (
        <div className="register-root-container">
        {isSuccessfull ? (
          <div><h3>Account created successfully</h3></div>
        ):(
          <div className="register-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
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
        )}
      </div>
    );
}