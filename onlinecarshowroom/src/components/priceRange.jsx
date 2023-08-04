import "./priceRange.css";
import { useState, useEffect } from "react";

export default function PriceRange(){
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const priceGap = 1000;
  
    useEffect(() => {
      if (maxPrice - minPrice >= priceGap) {
        // Calculate the position for the progress bar
        const minPercentage = (minPrice / 1000000) * 100;
        const maxPercentage = 100-(maxPrice / 1000000) * 100;
  
        // Update the progress bar using CSS
        const progress = document.querySelector('.price-slider .progress');
        progress.style.left = `${minPercentage}%`;
        progress.style.right = `${maxPercentage}%`;
      }
    }, [minPrice, maxPrice, priceGap]);
  
    const handleMinPriceChange = (event) => {
      const minValue = parseInt(event.target.value);
      setMinPrice(minValue);
    };
  
    const handleMaxPriceChange = (event) => {
      const maxValue = parseInt(event.target.value);
      setMaxPrice(maxValue);
    };
  
    const handleMinRangeChange = (event) => {
      const minVal = parseInt(event.target.value);
      if (maxPrice - minVal >= priceGap) {
        setMinPrice(minVal);
      } else {
        setMinPrice(maxPrice - priceGap);
      }
    };
  
    const handleMaxRangeChange = (event) => {
      const maxVal = parseInt(event.target.value);
      if (maxVal - minPrice >= priceGap) {
        setMaxPrice(maxVal);
      } else {
        setMaxPrice(minPrice + priceGap);
      }
    };
  
    return (
      <>
        <div className="price-selector-container">
          <div className="label">
            <p>Price Range</p>
          </div>
          <div className="price-input">
            <input type="number" placeholder="Min" value={minPrice} onChange={handleMinPriceChange} />
            <input type="number" placeholder="Max" value={maxPrice} onChange={handleMaxPriceChange} />
          </div>
          <div className="slider-container">
            <div className="price-slider">
              <div className="progress"></div>
            </div>
            <div className="range-input">
              <input type="range" min="0" max="1000000" value={minPrice} step="1000" onChange={handleMinRangeChange} />
              <input type="range" min="0" max="1000000" value={maxPrice} step="1000" onChange={handleMaxRangeChange} />
            </div>
          </div>
        </div>
      </>
    );
  }