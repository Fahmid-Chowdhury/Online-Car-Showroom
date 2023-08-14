import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios

export default function LoginPage() {
    const navigate = useNavigate(); // Use history for navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Add this line

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/user/login', {
                email,
                password,
            });
            console.log(response.status)
            if (response.status === 200) {
                const token = response.data.token;

                // Store the token in local storage or cookies
                localStorage.setItem('token', token);

                // Navigate to a protected route (e.g., user dashboard)
                // Replace '/dashboard' with the appropriate route
                navigate('/cars');
            } else {
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error(error.response.data);
            setError(error.response.data.message);
        }

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
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                    <div className="register-button">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
