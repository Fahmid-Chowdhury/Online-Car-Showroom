import React, {useState, useEffect} from 'react';
import backgroundCarImage from '../assets/background-car-image.png';
import { Link } from 'react-router-dom';

export default function HomePage() {

    return (
        <>
        <div className="relative flex flex-col flex-1 home-container">
            <div className=" text-container-title">  
                <div><h1><span className='magic'>Welcome<br></br> to Online<br></br>Car Showroom</span></h1></div>
                <div className='subtitle-container'><p>Find your dream car from a wide selection of vehicles.</p></div>
                <div className='button-container'><Link to='/cars'>
                    <button className='text-container-button'>Collections</button>
                </Link></div>
            </div>
            
        </div>
        </>
    );
}