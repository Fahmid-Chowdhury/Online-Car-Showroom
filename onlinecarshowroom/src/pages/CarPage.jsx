import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carPage.css';
import PriceRange from '../components/priceRange.jsx';
import ExtendedList from '../components/extendedList';


  

export default function CarPage() {
  const sortData = ["Price: Low to High", "Price: High to Low", "Stock", "Modified"];

  const pageSize = 12;
  const [carData, setCarData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [carTotal,setCarTotal] = useState(0);

  const handleForward = () => {
    if (page < Math.ceil(carTotal/pageSize)){
      setPage(prevPage => prevPage + 1);
    }
  };
  const handleBackward = () => {
    if (page > 1){
      setPage(prevPage => prevPage - 1);
    }
  };
  
  useEffect(() => {
    fetchCarData();
  }, [page]);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/car?page=${page}&pageSize=${pageSize}`);
      setCarData(response.data.data);
      setCarTotal(response.data.count); // Assuming the data is directly in response.data.data
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching car data:', error);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setDisplayedItems(prevDisplayedItems => prevDisplayedItems + pageSize);
};
  return (
    <>
    <div className="relative flex carpage-container">
      <div className="toolbar-container">
          <PriceRange/>
          <ExtendedList data = {sortData} title = "Sort" />
          <ExtendedList data = {sortData} title = "Brand" />
          <ExtendedList data = {sortData} title = "Type" />
      </div>
      <div className=" display-container">
        <div className=" display-item-container">
        {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              carData.map((car, index) => (
                <div key={index} className="display-item">
                  <div className="car-image-container">
                    
                  </div>
                  <div className="display-item-title">
                    <h3>{car.brand+" "+car.model}</h3>
                  </div>
                  
                </div>
              ))
            )}
        </div>
        <div className="display-page-count">
          {
            <>
            <div className="item-left">
              <p>Page {page} of {Math.ceil(carTotal/pageSize)}</p>
            </div>
            <div className="item-middle">
              <button className="page-button" onClick={handleBackward}>{"<"}</button>
              <button className="page-button" onClick={handleForward}>{">"}</button>
            </div>
            
            </>
          }
        </div>
        
      </div>
      
    </div>
    </>
  );
}
