import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carPage.css';
import PriceRange from '../components/priceRange.jsx';
import ExtendedList from '../components/extendedList';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';


function TestDrive({onClose, userId, carId}){
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  const handletestDrive = async (e) => {
    console.log(e.target.date.value);
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/testdrive/insert`,{
        userId: userId,
        carId: carId,
        date: e.target.date.value
      }, config);
      if (response.status === 200){
        alert('Test drive booked successfully');
      }
      else{
        alert('Test drive booking failed');
      }
      onClose(false);
    } catch (error) {
      alert('Test drive booking faileddd');
      console.error('Error fetching car data:', error);
    }
  };
  
      
  return (
    <div className="test-drive-container">
      <div className="test-drive-title">
        <h3>Book Test Drive</h3>
      </div>
      <div className="test-drive-form">
        <form onSubmit={handletestDrive}>
          <div className="test-drive-form-item">
            <label>Select a date</label>
            <input type="date" name='date'/>
            <div className="form-buttons">
              <button className="form-button">Submit</button>
            </div>
          </div>
        </form>
              <button className="form-button" onClick={()=>{onClose(false)}}>Cancel</button>
        </div>
    </div>
  )
}

function CrossIcon() {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

    </>
  )
}
function CommentBox({userInfo, carid}){
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [update, setUpdate] = useState(false);
  const fetchComment = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/commented?userId=${userInfo.user_id}&carId=${carid}`);
      setCommented(response.data.commented);
      setComment(response.data.comment[0].message);
      setRating(response.data.comment[0].rating);
    } catch (error) {
      console.error('Error fetching car data:', error);
      setCommented(false);
    }
  };
  const postComment = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/user/addcomment?update=${update}`,{
        userId: userInfo.user_id,
        carId: carid,
        rating: rating,
        comment: comment
      });
      setCommented(true);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };
  
  useEffect(() => {
    fetchComment();
  }, []);
  return (
    <div className="review-user">
      <div className="review-user-image">
        
      </div>
      <div className="review-comment-container">
          <div className="review-user-name">
            <h3>{userInfo.name}</h3>
          </div>
          
          {commented ? (
            <>
            <div className="review-user-rating">
              
              <p>Rated: {rating}</p>
            </div>
            <div className="review-user-comment">
            <p>{comment}</p>
            </div>
            <div className="review-edit">
              <button className="review-button" onClick={()=>{setCommented(false), setUpdate(true)}}>Edit</button>
            </div>
            </>) : (<>
            <div className="review-user-comment">
            <div className="review-rating">
              <p>Rating: </p>
              <select className="review-select" onChange={(e)=>{setRating(e.target.value)}}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <textarea className="review-textarea" placeholder="Write your review here" onChange={(e)=>{setComment(e.target.value)}} value={comment}></textarea>
            </div>
            <div className="review-submit">
              <button className="review-button" onClick={()=>{postComment()} }>Submit</button>
            </div>

            </>
          )
            }
          
          <div className="review-border"></div>
      </div>
    </div>
  )
}

function IndividualReview({name, rating, comment, key}){
  return (
    <div key={key} className="review-user">
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
function ReviewBox({comments, carid, userInfo,userId}){
  
  return (
    <div key ="reviewbox" className="review-box">
      <div className="title">
        <h3>Reviews</h3>
      </div>
      {userInfo &&
        <CommentBox userInfo={userInfo} carid = {carid}/>}
        
        {comments.length === 0 && <div className="no-reviews-box"><p>No reviews yet</p></div>}
        {comments.map((comment) => (
          comment.user_id !== userId && (
          <IndividualReview key={comment.id} name={comment.user_name} rating={comment.rating} comment={comment.message} />
          )
        ))}
    </div>
  )
}
  
function CarExtended({carId}){
  const navigate = useNavigate();
  const [carComment, setCarComment] = useState([]);
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState('');
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enqueryTitle, setEnqueryTitle] = useState('');
  const [enqueryMessage, setEnqueryMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  const [showTestDrive, setShowTestDrive] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  useEffect(() => {
    fetchCarComment();
    fetchCar();
    fetchUserInfo();
  }, [carId]);

  const submitEnquery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/enquiry/submitenquiry`,{
        user_id: userId,
        car_id: carId,
        title: enqueryTitle,
        message: enqueryMessage
      }, config);
      
      alert('Enquiry submitted successfully');

      setShowEnquiry(false);

      
    } catch (error) {
      console.error('Error submitting Enquiry', error);
    }
  };
  const fetchUserInfo =() => {
    try{
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      setUserInfo(decodedToken);
      setUserId(decodedToken.user_id);
      setLoggedIn(true);
      
    }catch (error){
      console.log(error);
    }
  }
  
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
  const handleOrderClick = (carId) => {
    navigate(`/order/${carId}`);
  };
  return (
    <>
    <div className="car-extended-wrap">
    {showTestDrive ?(
      loggedIn ?(
      <TestDrive onClose = {setShowTestDrive} userId = {userId} carId = {carId}/>):(
      <div className="test-drive-container">
        <div className="enquery-not-available">
          <p>You must be signed in to book a test drive. <Link to="/login">Sign in</Link> now.</p>
        </div>
        <button className="form-button" onClick={()=>{setShowTestDrive(false)}}>close</button>
      </div>
    )) : (null)}
      
    

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
      <div className="car-extended-buttons">
        <button className="car-extended-button" onClick={()=>{setShowEnquiry(true)}}>Enquiry</button>
        <button className="car-extended-button" onClick={()=>{handleOrderClick(carId)}}>Order now</button>
        <button className="car-extended-button" onClick = {()=>{setShowTestDrive(true)}}>Test drive</button>
      </div>
      

      { showEnquiry ? (
         loggedIn ?(
      <div className="car-extended-enquery">
        <div className="title">
          <h3>Enquiry</h3>
        </div>
        <form className="enquery-form" onSubmit={submitEnquery}>
          <div className="enquery-form-item">
            <label>Title</label>
            <input type="text" placeholder="Title" value={enqueryTitle} onChange={(e)=>{setEnqueryTitle(e.target.value)}}/>
            </div>
          <div className="enquery-form-item">
            <label>Message</label>
            <textarea type="text" value={enqueryMessage} placeholder="Message" onChange={(e)=>{setEnqueryMessage(e.target.value)}}/>
          </div>
          <div className="enquery-form-button">
            <button className="enquery-button">Submit</button>
            <button className="enquery-button" onClick={()=>{setShowEnquiry(false)}}>Cancel</button>
          </div>
        </form>
            
      </div>):(
      <div className="car-extended-enquery">
        <div className="enquery-not-available">
          <p>You must be signed in to send enquery about this product. <Link to="/login">Sign in</Link> now.</p>
          
        </div>
      </div>
      )) : (null)
      }
      
      <ReviewBox comments = {carComment} carid = {carId} userInfo={userInfo} userId={userId}/>
    </div>
  )
  }
  </div>
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
        {selectedCarId && 
          <div className="selected-car-container">
            <div className="close">
              <button onClick={()=>{setSelectedCarId(null)}}><CrossIcon/></button>
            </div>
            <CarExtended carId={selectedCarId}/>
            
          </div>
        }
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
                <div key={car.car_id} className="bg-white border border-gray-700 rounded-lg shadow cursor-pointer max-w-g gray800 hover:shadow-md" onClick={()=>{setSelectedCarId( car.car_id)}}>
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
