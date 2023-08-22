import './testDrive.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

function TestDriveContainer({data}){
    return(
        <div className="testDrive-card">
            <div className="testDrive-card-header">
                <h1>{data.brand} {data.model} {data.year}</h1>
                <h2>Booking Id: {data.testdrive_id}</h2>
            </div>
            <div className="testDrive-card-content">
                <div className="testDrive-grid">
                    <div className="testDrive-grid-item">
                        <h3>Date</h3>
                        <p>{data.date.split("T")[0]}</p>
                    </div>
                    <div className="testDrive-grid-item">
                        <h3>Status</h3>
                        <p>{data.status}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default function todaysAppointment() {
    const [testDrive, setTestDrive] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const fetchTestDrive = async () => {
        try {
            const response = await axios.post('http://localhost:5000/testdrive/adminlist', {status: 'scheduled'},config);
            setTestDrive(response.data.results);
            setLoading(false);
            
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTestDrive();
    }, []);
            
    return (
        <div className="testDrive-container">
            <div className="testDrive-title">
                <h1>Test Drive Requests</h1>
            </div>
            <div className="testDrive-content">
                {loading ? (
                    <ReactLoading type="bars" color />
                ) : error ? (
                    <h1>{error}</h1>
                ) : testDrive.length === 0 ? (
                    <h1>No test drive requests</h1>
                ) : (
                    <>
                        {testDrive.map((data) => (
                            <TestDriveContainer data={data} />
                        ))}
                    </>
                )}
            </div>
        </div>
                
    )
}