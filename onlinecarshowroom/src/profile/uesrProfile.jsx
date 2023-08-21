import './userProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function UserProfile({userId}) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/user/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response.data.results);
            setUserData(response.data.results[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, [userId, token]);

                
    
    return (
        <div className="user-profile-container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="user-profile">
                    <div className="user-profile-row">
                    <div className="user-profile-image">
                    </div>
                    <div className="user-profile-name">
                        <p>{userData.user_name}</p>
                    </div>
                    <div className="user-profile-item-grid">
                        
                    
                    <div className="user-profile-item">
                        <p className='title'>Email</p>
                        <p>{userData.email}</p>
                    </div>
                    <div className="user-profile-item">
                        <p className='title'>Phone</p>
                        <p>{userData.phone}</p>
                    </div>
                    <div className="user-profile-item">
                        <p className='title'>Address</p>
                        <p>{userData.address}</p>
                    </div>
                    <div className="user-profile-item">
                        <p className='title'>User Id</p>
                        <p>{userData.user_id}</p>
                    </div>
                    
                    </div>
                    </div>
                </div>)}
        </div>
    )
}

