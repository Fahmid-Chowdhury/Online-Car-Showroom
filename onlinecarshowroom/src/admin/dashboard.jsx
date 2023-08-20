
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './dashboard.css';
import AddCarForm from './addCarForm';
import AllCarView from './allCarView';
import CustomerOrder from './customerOrder';
import CustomerPayment from './customerPayment';
import OrderProcessing from './orderProcessing';
import CompletedOrders from './completedOrders';

const initialState = {
  allCar: false,
  addCar: false,
  enquery: false,
  order: false,
  payment: false,
  orderProcessing: false,
  completedOrders: false,
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
          <p>Orders</p>
        </div>
        <ToolbarItem title="Orders" onClick={() => handleStateChange('order')} />
        <ToolbarItem title="Payment" onClick={() => handleStateChange('payment')} />
        <ToolbarItem title="Processing" onClick={() => handleStateChange('orderProcessing')} />
        <ToolbarItem title="Completed" onClick={() => handleStateChange('completedOrders')} />
        <div className="toolbar-title">
          <p>Services</p>
        </div>
        <ToolbarItem title="Test drive" onClick={() => handleStateChange('testDrive')} />
        <ToolbarItem title="Enquery" onClick={() => handleStateChange('enquery')} />
      </div>
      
        {state.allCar && <AllCarView />}
        {state.addCar && <AddCarForm/>}
        {state.order && <CustomerOrder/>}
        {state.payment && <CustomerPayment/>}
        {state.orderProcessing && <OrderProcessing/>}
        {state.completedOrders && <CompletedOrders/>}
        {state.enquery && <h1>Enquery</h1>}
        {state.testDrive && <h1>Test drive</h1>}
      
      
    </div>
  );
}
