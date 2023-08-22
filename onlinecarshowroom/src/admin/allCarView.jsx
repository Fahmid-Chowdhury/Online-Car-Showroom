import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./allcarpage.css"

import axios from 'axios';

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

function DeleteIcon() {
    return(
        <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
        </svg>
        </>
    );
};
function DeleteCar({car_id}){
    const token = localStorage.getItem('token');
  
    const config = {
        headers: {
            Authorization: `bearer ${token}`, // Add the token to the Authorization header
        },
    };
    
    const deleteCar = async () => {
    
        try {
            const response = await axios.delete('http://localhost:5000/admin/deletecar', {
                data: { car_id: car_id },
                ...config
            });
    
            if (response.status === 200) {
                alert('Car deleted successfully');
                window.location.reload();
            
            } 
        } catch (error) {
            alert('Error deleting car');
            console.log(response)
        }
    };
    
    
    
    return (
        <div className="delete-car">
            <button onClick={deleteCar} ><DeleteIcon /></button>
        </div>
    );
}

function CarRow({car}) {
    return (
        <div className="admin-car-row">
            <div className="admin-car-row-item">
                <p>{car.car_id}</p>
            </div>
            <div className="admin-car-row-item">
                <p>{car.brand}</p>
            </div>
            <div className="admin-car-row-item">
                <p>{car.model}</p>
            </div>
            <div className="admin-car-row-item">
                <p>{car.year}</p>
            </div>
            <div className="admin-car-row-item">
                <p>{car.price}</p>
            </div>
            <div className="admin-car-row-item">
                <DeleteCar car_id={car.car_id}/>
            </div>
        </div>
    );
}
function CarHeader() {
    return (
        <div className="admin-car-header">
            <div className="admin-car-header-item">
                <p>Car ID</p>
            </div>
            <div className="admin-car-header-item">
                <p>Brand</p>
            </div>
            <div className="admin-car-header-item">
                <p>Model</p>
            </div>
            <div className="admin-car-header-item">
                <p>Year</p>
            </div>
            <div className="admin-car-header-item">
                <p>Price</p>
            </div>
            {/* <div className="admin-car-header-item">
                <p>Delete</p>
            </div> */}
        </div>
    );
}
function CarDisplay({carData}) {
    return (
        carData.map((car) => (
            <div className="admin-car-card">
                
                <CarRow car={car}/>
            </div>
        ))
    );
}

export default function AllCarView() {
    const [carData, setCarData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCarData();
    }, []);

    const fetchCarData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/allcars');
            setCarData(response.data.data.cars);
            setBrandData(response.data.data.brands);
            setYearData(response.data.data.years);
            
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching car data:', error);
            setIsLoading(false);
        }
  };
    
    return (
        <div className="dashboard-display-container">
        <div className="dashboard-title">
            <div className="title">
                <h1>All Cars</h1>
            </div>
            {/* <div className="title-links">
            <SortItem data = {brandData} title="Brand"/>
            <SortItem data = {yearData} title="Year"/>
            </div> */}
        </div>
        <div className="dashboard-display">
            {
                isLoading ? (
                    <div className="loading">
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <div className="all-car-container">
                        <CarHeader/>
                        <CarDisplay carData={carData}/>
                    </div>
                )
                                    
                                    
            }
        </div>
        </div>
    );
}
