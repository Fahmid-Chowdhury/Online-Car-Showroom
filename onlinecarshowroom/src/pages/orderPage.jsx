import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderPage.css';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Order({fnc}){
    const [orderSuccess, setOrderSuccess] = useState(false);
    const { carId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.user_id;
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(''); // error handling
    const  orderCar = async (e) => {
        setError('')
        e.preventDefault();
        console.log(carId);
        try{
            
            const response = await axios.post(`http://localhost:5000/user/order`, {
                carId: carId,
                userId: userId,
                deliveryAddress: address,
                phone: phone
                });
            if (response.status === 200) {
                setOrderSuccess(true);
                
            } else {
                console.log('Authentication failed');
            }
        } catch (error) {
            setError(error.message);
        
            
        };
    }
    if (orderSuccess) {
        return(
            <div className="order-page">
                <div className="order-container">
                <div className="order-success">
                    <p>Order successfull!</p>

                    <button onClick={() => navigate('/cars')}>Close</button>
                </div>

                </div>
            </div>
        )
    }
    else{
        return(
            <div className="order-page">
                <div className="order-container">
                
                <div className="order-title">
                    <h1>Order info</h1>
                </div>
                <form onSubmit={orderCar}>
                    <div className="order-item">
                        <label>Delivary address</label>
                        <input type="text" id="Delivery address" name="Delivery address" placeholder="Delivery address" onChange={e => setAddress(e.target.value)} value={address} required/>
                    </div>
                    <div className="order-item">
                        <label>Phone number</label>
                        <input type="text" id="Phone number" name="Phone number" placeholder="Phone number"onChange={e => setPhone(e.target.value)} value={phone} required/>
                    </div>
                    <div className="order-error">
                        <p>{error}</p>
                    </div>
                        
                    <div className="submit-order">
                        <button type="submit" >Order</button>
                    </div>
                    
                </form>
                </div>
            </div>
        )
    }
            
}

function CantOrder(){
    return(
        <div className="cant-order">
            <p>To order this car,<br></br> please <Link to="/login">Sign in</Link> or <Link to="/signup">Sign up</Link>.</p>
        </div>
    )
}

export default function OrderPage() {
    const [userId, setUserId] = useState('');
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);
            setUserId(decoded.user_id);
        }
    }, [token]);
    const { carId } = useParams();
    const navigate = useNavigate();

    if (!token) {
        return (
            <div className="order-page-container">
                <CantOrder/>
            </div>
        );
    }
    return (
        <div className="order-page-container">
            <Order/>       
        </div>
    );
}
