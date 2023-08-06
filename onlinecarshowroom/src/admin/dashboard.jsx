
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function DashboardPage() {
  const navigate = useNavigate(); // Use history for navigation
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user's name from localStorage (assuming you store the token as 'token')
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get user data
      const decodedToken = jwt_decode(token);
      setUserData(decodedToken);
      if (decodedToken.role !== 'admin') {
        navigate('/');
      }
    } else {
      // If no token is found, navigate to the login page
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {userData && (
        <>
          <div className="dashboard-container">
            
          </div>
        </>
      )}
    </div>
  );
}
