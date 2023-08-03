import React, { useState, useEffect } from 'react';
import './carPage.css';
import MapCar from '../components/MapCar';
import ToolBar from '../components/toolbar';

function Selector({type, data}){
  return(
    <>
    <div className="toolbar-item-selector">
        <label htmlFor={type}>{type}:</label>
            <select id={type}>
              <option value="">All</option>
              <option value="lt30">Less than $30,000</option>
              <option value="30to50">$30,000 - $50,000</option>
              <option value="gt50">More than $50,000</option>
            </select>
      </div>
    </>
  )
}
export default function CarPage() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Make the API request when the component mounts
  //   fetch('http://localhost:5000/api/cars')
  //     .then(response => response.json())
  //     .then(data => {
  //       setData(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching car data:', error);
  //     });
  // }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
    <div className="relative flex flex-col flex-1 carpage-container">
      <ToolBar />
    <div>
      
    </div>
    </div>
    </>
  );
}
