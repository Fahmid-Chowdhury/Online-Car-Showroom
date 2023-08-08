
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './dashboard.css';

export default function DashboardPage() {
  const navigate = useNavigate(); // Use history for navigation
  const [userData, setUserData] = useState(null);
  const[request,setRequest]=useState(false);
  const[newCar,setNewCar]=useState(false);
  const[rentCar,setRentCar]=useState(false);

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
      <div className="dashboard-toolbar">
        <div className="dashboard-toolbar-title">
          <h1>ADMIN PANEL</h1>
          
        </div>
        <div className="toolbar-title">
          <p>Car info</p>
        </div>
        <div className="toolbar-item">
          <p>New cars</p>
        </div>
        <div className="toolbar-item">
          <p>Used cars</p>
        </div>
        <div className="toolbar-item">
          <p>Rental cars</p>
        </div>
        <div className="toolbar-title">
          <p>User request</p>
        </div>
        <div className="toolbar-item">
          <p>Buy request</p>
        </div>
        <div className="toolbar-item">
          <p>Sell request</p>
        </div>
        <div className="toolbar-item">
          <p>Rent request</p>
        </div>
        <div className="toolbar-item">
          <p>Test drive</p>
        </div>
      </div>
      <div className="dashboard-display-container">
        <div className="dashboard-title"><h1>Dashboard</h1></div>
      </div>
      
    </div>
  );
}
