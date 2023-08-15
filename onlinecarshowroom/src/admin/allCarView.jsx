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

export default function AllCarView({brand, type}) {
    const [carData, setCarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCarData();
    }, []);

    const fetchCarData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/allcars');
            setCarData(response.data.data);
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
            <div className="title-links">
            <SortItem data = {brand} title="Brand"/>
            <SortItem data = {brand} title="Type"/>
            </div>
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
