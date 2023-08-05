import React, { useState, useEffect } from 'react';
import './carPage.css';
import PriceRange from '../components/priceRange.jsx';
import ExtendedList from '../components/extendedList';

export default function RentPage() {
  
  const carData = ["Toyota", "BMW", "Mclaren","Porche"]
  const sortData = ["Price: Low to High", "Price: High to Low","Stock","Modified"]
  return (
    <>
    <div className="relative flex carpage-container">
      <div className="toolbar-container">
          <ExtendedList data = {sortData} title = "Sort" />
          <ExtendedList data = {carData} title = "Brand" />
          <ExtendedList data = {carData} title = "Type" />
      </div>
      <div className=" display-container">
        <div className=" search-container">
        <div>
          <input type="text" placeholder="Search.." name="search" />
        </div>
        </div>
        
        
        <div className=" display-item-container">
          
        </div>
        
      </div>
      
      
    <div>
      
    </div>
    </div>
    </>
  );
}