import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import '../admin/dashboard.css';

import UserProfile from './uesrProfile';

const initialState = {
  profile: false,
  editInfo: false,
  enquery: false,
  order: false,
  testDrive: false,
};

function ToolbarItem(props) {
  return (
    <div className="toolbar-item" onClick={props.onClick}>
      <p>{props.title}</p>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate(); // Use history for navigation
  const [state, setState] = useState(initialState);
  const [userData, setUserData] = useState(null);
  
  const handleStateChange = (key) => {
    const newState = { ...initialState, [key]: true };
    setState(newState);
  };
  
  
  useEffect(() => {
    handleStateChange('profile');

    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwt_decode(token);
        setUserData(decodedToken);

    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-toolbar">
        <div className="dashboard-toolbar-title">
          <h1>User Panel</h1>
          
        </div>
        <div className="toolbar-title">
          <p>User Info</p>
        </div>
        <ToolbarItem title="Profile" onClick={() => handleStateChange('profile')} />
        <ToolbarItem title="Edit Info" onClick={() => handleStateChange('editInfo')} />
        <div className="toolbar-title">
          <p>Services</p>
        </div>
        <ToolbarItem title="Orders" onClick={() => handleStateChange('order')} />
        <ToolbarItem title="Test drive" onClick={() => handleStateChange('testDrive')} />
        <ToolbarItem title="Enquery" onClick={() => handleStateChange('enquery')} />
        </div>
      
        {state.profile && <UserProfile userId ={userData.user_id}/>}
        {state.editInfo && <h1>Edit Info</h1>}
        {state.enquery && <h1>Enquery</h1>}
        {state.order && <h1>Orders</h1>}
      
      
    </div>
  );
}
