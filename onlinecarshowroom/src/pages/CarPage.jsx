import React, { useState, useEffect } from 'react';
import './carPage.css';
import PriceRange from '../components/priceRange.jsx';
import ExtendedList from '../components/extendedList';

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
  const carData = ["Toyota", "BMW", "Mclaren","Porche"]
  const sortData = ["Price: Low to High", "Price: High to Low","Stock","Modified"]
  return (
    <>
    <div className="relative flex carpage-container">
      <div className="toolbar-container">
          <PriceRange/>
          <ExtendedList data = {sortData} title = "Sort" />
          <ExtendedList data = {carData} title = "Brand" />
          <ExtendedList data = {carData} title = "Type" />
        
      </div>
      <div className=" display-container">
        
        <div className=" display-item-container">
          
        </div>
        
      </div>
      
      
    <div>
      
    </div>
    </div>
    </>
  );
}
