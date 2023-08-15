
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './dashboard.css';
import AddCarForm from './addCarForm';
import AllCarView from './allCarView';

const initialState = {
  allCar: false,
  addCar: false,
  enquery: false,
  sellRequest: false,
  rentRequest: false,
  testDrive: false,
  carModel: false,
};
function AddIcon(){
  return(
    <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</>
  )
}
const carModel = ["All","Toyota", "BMW","Merceedes"];
function ToolbarItem(props) {
  return (
    <div className="toolbar-item" onClick={props.onClick}>
      <p>{props.title}</p>
    </div>
  );
}




function ShowCars({data}){
  return (
    <>
    <div className="display-car-container">
      
      
    </div>
    </>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate(); // Use history for navigation
  const [state, setState] = useState(initialState);
  const [userData, setUserData] = useState(null);
  
  
  
  const handleStateChange = (key) => {
    const newState = { ...initialState, [key]: true };
    setState(newState);
  };
  
  
  useEffect(() => {
    handleStateChange('allCar');

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
        <ToolbarItem title="All cars" onClick={() => handleStateChange('allCar')} />
        <ToolbarItem title="Add car" onClick={() => handleStateChange('addCar')} />
        <div className="toolbar-title">
          <p>User request</p>
        </div>
        <ToolbarItem title="Enquery" onClick={() => handleStateChange('enquery')} />
        <ToolbarItem title="Sell request" onClick={() => handleStateChange('sellRequest')} />
        <ToolbarItem title="Rent request" onClick={() => handleStateChange('rentRequest')} />
        <ToolbarItem title="Test drive" onClick={() => handleStateChange('testDrive')} />
      </div>
      
        {state.allCar && <AllCarView brand = {carModel}/>}
        {state.addCar && <AddCarForm/>}
        
        {state.enquery && <h1>Enquery</h1>}
        {state.sellRequest && <h1>Sell request</h1>}
        {state.rentRequest && <h1>Rent request</h1>}
        {state.testDrive && <h1>Test drive</h1>}
      
      
    </div>
  );
}
