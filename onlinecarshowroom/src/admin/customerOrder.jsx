import "./customerOrder.css"
import { useEffect, useState } from "react";
import axios from "axios";

function OrderItem({order, onupdate}) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
        Authorization: `bearer ${token}`, // Add the token to the Authorization header
        },
    };
    const confirmOrder = async () => {
        const shouldConfirm = window.confirm("Are you sure you want to confirm order?");
        if (shouldConfirm) {
            try {
                const response = await axios.post("http://localhost:5000/admin/confirmorder", {order_id: order.order_id}, config);
                if (response.status === 200){
                    alert("Order confirmed");
                    onupdate();
                    
                }else {
                    alert("Something went wrong");
                }

            } catch (error) {
                console.log(error.message);
                alert(error.message);
            }
        }
    }
    const cancelOrder = async () => {
        const shouldConfirm = window.confirm("Are you sure you want to cancel order?");
            if (shouldConfirm) {
                try {
                    const response = await axios.post("http://localhost:5000/admin/cancelorder", {order_id: order.order_id}, config);
                    if (response.status === 200){
                        alert("Order cancelled");
                        onupdate();
                    }else {
                        alert("Something went wrong");
                    }
                } catch (error) {
                    console.log(error.message);
                    alert(error.message);
                }
            }
        }
        
    return (
        <div className="customer-order-item">
            <div className="customer-item-title">
                <p>{order.brand} {order.model} {order.year}</p>
                <p>Order ID: {order.order_id}</p>
            </div>
            <div className="customer-order-grid">
                <div className="customer-order-grid-item">
                    <h4>Order Date</h4>
                    <p>{new Date(order.order_date).toLocaleDateString()}</p>
                </div>
                <div className="customer-order-grid-item">
                    <h4>User ID</h4>
                    <p>{order.user_id}</p>
                </div>
                <div className="customer-order-grid-item">
                    <h4>Contact</h4>
                    <p>{order.contact_number}</p>
                </div>
                <div className="customer-order-grid-item">
                    <h4>Total Price</h4>    
                    <p>{order.total_price}</p>
                </div>
            </div>

            <div className="customer-order-buttons">
                <button onClick={confirmOrder} >Confirm</button>
                <button onClick={cancelOrder}>Cancel</button>
                
            </div>
        </div>
    )
}

function OrderList({orders, onupdate}){
    if(orders.length === 0){
        return (
            <div className="customer-order-none">
                <p>No more orders</p>
            </div>
        )
    }
    else {
        return(
            <>
            {orders.map((order) => (
                <OrderItem order={order} key={order.order_id} onupdate = {onupdate}/>
                ))}
            </>
    )}
}
export default function CustomerOrder() {
    const [customerOrder, setCustomerOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
  
    const config = {
        headers: {
        Authorization: `bearer ${token}`, // Add the token to the Authorization header
        },
    };

    const fetchCustomerOrder = async () => {
        try {
            const response = await axios.get("http://localhost:5000/admin/getorders", config);
            setCustomerOrder(response.data.results);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);

        }
    };

    
    useEffect(() => {
        fetchCustomerOrder();
        setLoading(true);
    }, []);
    return (
        <div className="customer-order-container">
            <div className="customer-order-title">
                <h1>Customer Order</h1>
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="customer-order-table">
                        <OrderList orders={customerOrder} onupdate = {fetchCustomerOrder}/>
                </div>
            )}
            
        </div>
    )
}
