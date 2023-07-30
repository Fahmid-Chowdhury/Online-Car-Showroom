import React from 'react';
import backgroundCarImage from '../assets/background-car-image.png';

export default function HomePage() {

    return (
        <>
        <div className="relative flex flex-col flex-1 home-container">
            <div className="text-container-title">
                <h1><span className='magic'>Welcome<br></br> to Online<br></br>Car Showroom</span></h1>
            </div>
            <div className="text-container-subtitle">
                <p>Find your dream car from a wide selection of vehicles.</p>
            </div>
        </div>
        </>
    );
}