import React from "react";
import "./carCard.css"

function Car({ car }) {
  return (
    <div className="car-card-container">
        <h2>{car.brand}</h2>
        <p>{car.model}</p>
        
    </div>
  );
}
export default function MapCar({ carJSON }) {
    console.log(carJSON);
    return (
        <div className="car-list">
        {carJSON.map((car) => (
            <Car car={car} />
        ))}
        </div>
    );

}