import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderPage.css';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Order(){
    return(
        <div className="order-page">
            <div className="order-container">
            <div className="order-title">
                <h1>Order info</h1>
            </div>
            <form>
                <div className="order-item">
                    <label htmlFor="Delivery address">Delivary address</label>
                    <input type="text" id="Delivery address" name="Delivery address" placeholder="Delivery address" required/>
                </div>
                <div className="order-item">
                    <label htmlFor="Phone number">Phone number</label>
                    <input type="text" id="Phone number" name="Phone number" placeholder="Phone number" required/>
                </div>
                <div className="submit-order">
                    <button type="submit">Order</button>
                </div>
                
            </form>
            </div>
        </div>
    )
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
    const [orderSuccess, setOrderSuccess] = useState(false);
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);
            setUserId(decoded.user_id);
            console.log(decoded);
        }
    }, [token]);

    const  orderCar = async () => {
        const response = await axios.post(`http://localhost:5000/api/order/${userId}/${carId}`);
        console.log(response);
        navigate('/cars');
    };
    
        
    
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
