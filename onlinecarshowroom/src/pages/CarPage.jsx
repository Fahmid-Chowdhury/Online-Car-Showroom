import React, { useState, useEffect } from 'react';
import './carPage.css';
import MapCar from '../components/MapCar';

export default function CarPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make the API request when the component mounts
    fetch('http://localhost:5000/api/cars')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
    <div className="relative flex flex-col flex-1 carpage-container">
      <div className="toolbar-item">
      </div>
    <div>
      {data ? <div>
        <MapCar carJSON={data} />
      
      </div> : <div>Loading...</div>}
    </div>
    </div>
    </>
  );
}
