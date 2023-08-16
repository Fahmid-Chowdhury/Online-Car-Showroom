import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carPage.css';
import PriceRange from '../components/priceRange.jsx';
import ExtendedList from '../components/extendedList';

function IndividualReview(){
  return (
    <div className="review-user">
      <div className="review-user-image">
        
      </div>
      <div className="review-comment-container">
          <div className="review-user-name">
            <h3>John Doe</h3>
          </div>
          <div className="review-user-rating">
            <p>Rated: 5</p>
          </div>
          <div className="review-user-comment">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
          </div>
          <div className="review-border"></div>
      </div>
    </div>
  );
}
function ReviewBox(){
  return (
    <div className="review-box">
      <div className="test">
        <h3>Reviews</h3>
      </div>
        <IndividualReview/>
        <IndividualReview/>
        <IndividualReview/>
        <IndividualReview/>
      
      
    </div>
  )
}
  
function CarExtended({carId}){
  return (
    <div className="car-extended-container">
      <div className="car-extended-row">
        <div className="car-extended-image">
          image
          </div>
        <div className="car-extended-info">
          <div className="car-extended-title">
          <h3>Lamborghini</h3>
          <h4>Huracan Performante</h4>
          </div>
          <div className="car-extended-description">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque hic deleniti, a nemo excepturi sequi, molestias maxime veniam cupiditate suscipit explicabo sint corporis atque dicta tempora rerum aspernatur delectus laudantium?
            Quas porro fugiat laudantium ut, rerum sint eum qui, consectetur quidem ratione dolorem pariatur minus? Dicta incidunt alias repudiandae officiis possimus sunt cum magni delectus, nobis, porro quis eius ad.
            At cupiditate maiores corporis molestias labore, libero recusandae velit earum? Cumque quod nisi repudiandae delectus possimus obcaecati repellat ipsum quasi. Nisi cupiditate ex consequatur reprehenderit minima odio velit natus assumenda.
            </p>
          </div>
          <div className="car-extended-price">
            <h3>$650000</h3>
          </div>
        </div>
      </div>
      <ReviewBox/>
    </div>
  )
}
export default function CarPage() {
  const sortData = ["Price: Low to High", "Price: High to Low", "Stock", "Modified"];

  const pageSize = 12;
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [carTotal,setCarTotal] = useState(0);
  const [selectedCarId, setSelectedCarId] = useState(null);

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
      {selectedCarId && 
          <div className="selected-car-container">
            <div className="close">
              <button onClick={()=>{setSelectedCarId(null)}}>Close</button>
            </div>
            <CarExtended carId={selectedCarId}/>
            
          </div>
          }
        <div className=" display-item-container">
        
        {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              carData.map((car, index) => (
                <div key={index} className="display-item" onClick={()=>{setSelectedCarId( car.car_id); console.log(selectedCarId)}}>
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
