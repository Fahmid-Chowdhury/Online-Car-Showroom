
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './dashboard.css';

const initialState = {
  newCar: false,
  usedCar: false,
  rentCar: false,
  buyRequest: false,
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
const carModel = ["All","Toyota", "BMW"];
function ToolbarItem(props) {
  return (
    <div className="toolbar-item" onClick={props.onClick}>
      <p>{props.title}</p>
    </div>
  );
}
function SortItem({data,title}) {
  return (
    <div className="title-link">
      <label>{title}:</label>
        <select>
        {data.map((item) => (
          <option value={item}>{item}</option>
        ))}
        </select>
    </div>
  );
}
function InfoTitle({ title, brand}) {
  return (
    <div className="dashboard-title">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="title-links">
        
          <button className="addrecord-button"> <AddIcon/>Add record</button>
        
        <SortItem data = {brand} title="Brand"/>
        <SortItem data = {brand} title="Type"/>
        
      </div>
    </div>
  );
}

function DashboardInfoContainer({title,data}){
  return(
    <div className="dashboard-display-container">
        <InfoTitle brand = {data} title={title}/>
        <div className="dashboard-display">
          
        </div>
    </div>
  )
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
    handleStateChange('newCar');

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
        <ToolbarItem title="Car models" onClick={() => handleStateChange('carModel')} />
        <ToolbarItem title="New cars" onClick={() => handleStateChange('newCar')} />
        <ToolbarItem title="Used cars" onClick={() => handleStateChange('usedCar')} />
        <ToolbarItem title="Rental cars" onClick={() => handleStateChange('rentCar')} />
        <div className="toolbar-title">
          <p>User request</p>
        </div>
        <ToolbarItem title="Buy request" onClick={() => handleStateChange('buyRequest')} />
        <ToolbarItem title="Sell request" onClick={() => handleStateChange('sellRequest')} />
        <ToolbarItem title="Rent request" onClick={() => handleStateChange('rentRequest')} />
        <ToolbarItem title="Test drive" onClick={() => handleStateChange('testDrive')} />
      </div>

      
      
        {state.newCar && <DashboardInfoContainer title="New Cars" data={carModel}/>}
        {state.usedCar && <DashboardInfoContainer title="Used Cars" data={carModel}/> }
        {state.rentCar && <DashboardInfoContainer title="Rental Cars" data={carModel}/> }
        {state.carModel && <DashboardInfoContainer title="Car Models" data={carModel}/> }
        {state.buyRequest && <h1>Buy request</h1>}
        {state.sellRequest && <h1>Sell request</h1>}
        {state.rentRequest && <h1>Rent request</h1>}
        {state.testDrive && <h1>Test drive</h1>}
      
      
    </div>
  );
}
