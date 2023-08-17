import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carPage.css';
import PriceRange from '../components/priceRange.jsx';
import ExtendedList from '../components/extendedList';

function CrossIcon() {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

    </>
  )
}

function IndividualReview({name, rating, comment}){
  return (
    <div className="review-user">
      <div className="review-user-image">
        
      </div>
      <div className="review-comment-container">
          <div className="review-user-name">
            <h3>{name}</h3>
          </div>
          <div className="review-user-rating">
            <p>Rated: {rating}</p>
          </div>
          <div className="review-user-comment">
            <p>{comment}</p>
          </div>
          <div className="review-border"></div>
      </div>
    </div>
  );
}
function ReviewBox({comments}){
  console.log("comments: ",comments);
  return (
    <div className="review-box">
      <div className="test">
        <h3>Reviews</h3>
      </div>
        {comments.length === 0 && <p>No reviews yet</p>}
        {comments.map((comment) => (
          <IndividualReview name = {comment.user_name} rating = {comment.rating} comment = {comment.message}/>
        ))}
        
      
    </div>
  )
}
  
function CarExtended({carId}){
  const [carComment, setCarComment] = useState([]);
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchCarComment();
    fetchCar();
  }, [carId]);
  
  const fetchCar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/getcar?carId=${carId}`);
      setCarData(response.data.carData);
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching car data:', error);
      setIsLoading(false);
    }
  };
  const fetchCarComment = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/comments?carId=${carId}`); 
      setCarComment(response.data.comment);
    }
    catch (error) {
      console.error('Error fetching comments', error);
    }
  }
  return (
    <>
    {isLoading ? (
      <div className="loading">Loading...</div>
    ) : (
    <div className="car-extended-container">
      <div className="car-extended-row">
        <div className="car-extended-image">
          <img src={`http://localhost:5000/images/image/${carData.images}`} alt="image" /> 
        </div>
        <div className="car-extended-info">
          <div className="car-extended-title">
          <h3>{carData.brand}</h3>
          <h4>{carData.model}</h4>
          </div>
          <div className="car-extended-year">
            <p>{carData.year}</p>
          </div>
          <div className="car-extended-description">
            <p>{carData.description}</p>
          </div>
          <div className="car-extended-specs">
            <p className = "title">Specs</p>
            <div className="car-extended-spec-grid">
              <div className="car-extended-spec-item">
                <p className='title'>Engine</p>
                <p>{carData.engine}</p>
              </div>
              <div className="car-extended-spec-item">
                <p className='title'>Transmission</p>
                <p>{carData.transmission}</p>
              </div>
              <div className="car-extended-spec-item">
                <p className='title'>Fuel</p>
                <p>{carData.fuel}</p>
              </div>
              <div className="car-extended-spec-item">
                <p className='title'>Price</p>
                <p>{carData.price}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <ReviewBox comments = {carComment}/>
    </div>
  )
  }
  </>
  );
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
              <button onClick={()=>{setSelectedCarId(null)}}><CrossIcon/></button>
            </div>
            <CarExtended carId={selectedCarId}/>
            
          </div>
          }
        <div className=" display-item-container">
        
        {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              carData.map((car, index) => (
                // <div key={index} className="display-item" onClick={()=>{setSelectedCarId( car.car_id); console.log(selectedCarId)}}>
                //   <div className="car-image-container">
                //   <img src={`http://localhost:5000/images/getimage/${car.images}`} alt="image" /> 
                //   </div>
                //   <div className="display-item-title">
                //     <h3>{car.brand+" "+car.model}</h3>
                    
                //   </div>
                  
                // </div>\
                <div className="bg-white border border-gray-200 rounded-lg shadow cursor-pointer max-w-g dark:bg-gray-800 dark:border-gray-700" onClick={()=>{setSelectedCarId( car.car_id)}}>
                    <div className=" h-60">
                      <img className ="car-card-img" src={`http://localhost:5000/images/image/${car.images}`} alt="image" />
                    </div>
                    <div className="p-5">
                        <h5 className = "mb-2 text-xl font-bold text-gray-700 dark:text-gray-200">{car.brand+" "+car.model}</h5>
                        <p className="mb-3 text-sm text-gray-900 dark:text-gray-100">{car.year}</p>
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            
                            <p className="text-sm ">Price: {car.price}</p>
                            </div>
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
