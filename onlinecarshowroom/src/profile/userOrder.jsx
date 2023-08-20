import './userOrder.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserOrder({userId}) {
    return (
        <div className="user-order-container">
            <div className="user-order-title">
                <h1>Order</h1>
            </div>
            <div className="user-order-content">
                <div className="user-order-item">

                </div>
            </div>
        </div>
    )
}