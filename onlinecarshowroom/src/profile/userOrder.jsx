import './userOrder.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

const orderData ={
    order_id: 1,
    car_id: 1,
    brand: "BMW",
    model: "X5",
    year: 2021,
    order_date: "2021-08-01",
    total_price: 100000,
    payment_reference: "123456789",
    payment_status: "pending",
    delivery_address: "123, abc street, xyz city",
    contact_number: "1234567890",
    order_status: "confirmed",
}
function OrderItem({data}){
    return(
        <>
        <div className="user-order-item-container">
            <div className="title">
                <h1>{data.brand} {data.model} {data.year}</h1>
                <h1>Order ID: {data.order_id}</h1>
            </div>
            <div className="status-container">
            <div className="status">
                <div className= {`status-${data.order_status}`}>
                    
                </div>
            </div>
            <div className="status-circle">
                <div className={`circle ${data.order_status}`}></div>
                <div className={`circle ${data.order_status}`}></div>
                <div className={`circle ${data.order_status}`}></div>
                <div className={`circle ${data.order_status}`}></div>
                
            </div>
            <div className="status-text">
                <p>{data.order_status}</p>
            </div>
            </div>
            <div className="order-detail-container">
                <div className="order-detail">
                    <h1>Payment reference</h1>
                    <p>{data.payment_reference}</p>

                </div>
                <div className="order-detail">
                    <h1>Payment status</h1>
                    <p>{data.payment_status}</p>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default function UserOrder({userId}) {
    const [orderData, setOrderData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `bearer ${token}`, // Add the token to the Authorization header
        },
    }; 
    const fetchOrders = async () => { 
        try {
            const response = await axios.post(`http://localhost:5000/user/orderretrieve`,
                {
                userId: userId
               },
                config);
            
            setOrderData(response.data.orders);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }
         
    
    
    useEffect(() => {
        fetchOrders();
    }, []);
     
    return (
        <div className="user-order-container">
            <div className="user-order-title">
                <h1>Orders</h1>
            </div>
            <div className="user-order-content">
                {loading ? (
                    <div className="loading-container">
                        <div className="loading">
                            <ReactLoading type={'bars'} color height={'50px'} width={'50px'} />
                        </div>
                    </div>
                ) : (
                    <>
                    {error ? (
                        <div className="error-container">
                            <h1>{error}</h1>
                        </div>
                    ) : (
                        <>
                        {orderData.length === 0 ? (
                            <div className="no-order-container">
                                <h1>No orders yet</h1>
                            </div>
                        ) : (
                            <>
                            {orderData.map((data) => (
                                <OrderItem data={data}/>
                            ))}
                            </>
                        )}
                        </>
                        
                    )
                    
                    }
                    
                    </>
                )}

            </div>
        </div>
    )
}