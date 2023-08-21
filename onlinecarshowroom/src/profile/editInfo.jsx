import './editInfo.css' ;
import { useState, useEffect } from 'react';
import axios from 'axios';

const links = {
    updateName: 'http://localhost:5000/user/nameUpdate',
    updateEmail: 'http://localhost:5000/user/emailUpdate',
    updatePhone: 'http://localhost:5000/user/phoneUpdate',
    updateAddress: 'http://localhost:5000/user/addressUpdate',
    updatePassword: 'http://localhost:5000/user/passwordUpdate',
}
export default function EditInfo({userId}) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `bearer ${token}`, // Add the token to the Authorization header
        },
    };
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleNameUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(links.updateName, { user_id: userId, newName: userName.trim() }, config);
            console.log(response);
            if (response.status === 200) {
                setSuccess('Name updated successfully');
                setError('');
            } 
            else {
                setError(response.message);
                setSuccess('');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
                setSuccess('');
              } else {
                console.log('here')
                setError(err.message);
                setSuccess('');
              }
        }
    };
    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(links.updateEmail, { user_id: userId, newEmail: userEmail.trim() }, config);
            console.log(response);
            if (response.status === 200) {
                setSuccess('Email updated successfully');
                setError('');
            }
            else {
                setError(response.message);
                setSuccess('');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
                setSuccess('');
                } else {
                setError(err.message);
                setSuccess('');
                }
        }   
    };

    const handlePhoneUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(links.updatePhone, { user_id: userId, newPhone: userPhone.trim() }, config);
            console.log(response);
            if (response.status === 200) {
                setSuccess('Phone updated successfully');
                setError('');
            }
            else {
                setError(response.message);
                setSuccess('');

            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
                setSuccess('');
                } else {
                setError(err.message);
                setSuccess('');
                }
        }
    };
    const handleAddressUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(links.updateAddress, { user_id: userId, newAddress: userAddress.trim() }, config);
            console.log(response);
            if (response.status === 200) {
                setSuccess('Address updated successfully');
                setError('');
            }
            else {
                setError(response.message);
                setSuccess('');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
                setSuccess('');
                } else {
                setError(err.message);
                setSuccess('');
                }
        }
    };
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.patch(links.updatePassword, { user_id: userId, newPassword: userPassword.trim() }, config);
            console.log(response);
            if (response.status === 200) {
                setSuccess('Password updated successfully');
                setError('');

            }
            else {
                setError(response.message);
                setSuccess('');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
                setSuccess('');
                } else {
                setError(err.message);
                setSuccess('');
                }
        }
    };
    
    
                

    
    return (
        <div className="edit-info-container">
            <div className="edit-info-title">
                <h1>Edit Info</h1>
            </div>
            <div className="edit-info-form">
                <div className="grid-wrap">
                    <div className="grid-item">
                        <form onSubmit={handleNameUpdate}>
                            <label htmlFor="name">User name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <button type="submit">Update</button>
                        </form>
                        <form onSubmit={handleEmailUpdate} >
                            <label htmlFor="email">Email</label>
                            <input

                                type="email"
                                name="email"
                                id="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Update</button>
                        </form>
                        <form onSubmit={handlePhoneUpdate}>
                            <label htmlFor="phone">Phone</label>
                            <input

                                type="text"
                                name="phone"
                                id="phone"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                required
                            />
                            <button type="submit">Update</button>
                        </form>
                        <form onSubmit={handleAddressUpdate}>
                            <label htmlFor="address">Address</label>
                            <input
                                type='text'
                                name="address"
                                id="address"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                required
                            />
                            <button type="submit">Update</button>
                        </form>
                        <form onSubmit={handlePasswordUpdate}>
                            <label htmlFor="password">Password</label>
                            <input
                                type='password'
                                name="password"
                                id="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Update</button>
                        </form>
                        <div className="error-container">
                            {error && <p>{error}</p>}
                            {success && <p className='success-text'>{success}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
                        