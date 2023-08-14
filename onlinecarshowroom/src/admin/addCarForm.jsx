import React, { useState } from 'react';
import './AddCarForm.css';
import axios from 'axios';
function TickIcon(){
    return(
        <>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</>
    )
}

export default function AddCarForm({ onClose, onAddCar }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuel, setFuel] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // error handling
  const [isValid, setisValid] = useState(false);
  const token = localStorage.getItem('token');
  
  // ... other form fields
  const config = {
    headers: {
      Authorization: `bearer ${token}`, // Add the token to the Authorization header
    },
  };
  const handleAddCar = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('brand', brand);
    // formData.append('image', image);
  
    try {
        const response = await axios.post('http://localhost:5000/admin/addcar', {
            brand: brand,
            model: model,
            year: year,
            price: price,
            engine: engine,
            transmission: transmission,
            fuel: fuel,
            description: description,
        },
        config);
  
        if (response.status === 200) {
            
            setisValid(true)
        } else {
            console.log('Authentication failed');
        }
    } catch (error) {
        setError(error.response.data.message);

    }
  
    // Reset the form
    setBrand('');
    setModel('');
    setYear('');
    setPrice('');
    setEngine('');
    setTransmission('');
    setDescription('');
    
    
    
  };
    

  return (
    <div className="form-root-container">
        {isValid ? (
          <div className='form-response-valid'>
            <div className="response-container">
                <TickIcon/>
                <h1>Car Added Successfully</h1>
                <button className="form-button" onClick={onAddCar}>Close</button>
            </div>
          </div>
        ):(
            <>
            <form className="form-container" onSubmit={handleAddCar}>
                <div className="form-title">
                    <h1>Add Car</h1>
                </div>
                <div className="form-input-container">
                    <div className="form-input-row">
                    <div className="form-input">
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder='Brand' required/>
                    </div>
                    <div className="form-input">
                        <label>Model</label>
                        <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder='Model' required/>
                    </div></div>
                    <div className="form-input">
                        <label>Year</label>
                        <input type="text" value={year} onChange={e => setYear(e.target.value)}placeholder='20XX' required/>
                    </div>
                    <div className="form-input">
                        <label>Price</label>
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)}placeholder='Price' required/>
                    </div>
                    <div className="form-input">
                        <label>Engine</label>
                        <input type="text" value={engine} onChange={e => setEngine(e.target.value)} placeholder='Type'required/>
                    </div>
                    <div className="form-input">
                        <label>Transmission</label>
                        <input type="text" value={transmission} onChange={e => setTransmission(e.target.value)} placeholder='Type'required/>
                    </div>
                    <div className="form-input">
                        <label>Fuel</label>
                        <input type="text" value={fuel} onChange={e => setFuel(e.target.value)} placeholder='Type'required/>
                    </div>
                    <div className="form-input">
                        <label>Description</label>
                        <textarea maxLength={6000} type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder='Description'required/>
                    </div>
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                    
                    
                </div>
                <div className="form-button-container">
                    <button className="form-button"  type='submit'>Add Car</button>
                    <button className="form-button" onClick={onClose}>Cancel</button>
                </div>
            </form>
            </>
        )}
      </div>
  );
}
