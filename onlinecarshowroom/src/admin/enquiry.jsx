import './enquiry.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

function EnquiryContainer({data}){
    return(
        <div className="enquiry-container">
            <div className="enquiry-title">
                <h1>{data.title}</h1>
                <h2>{data.brand} {data.model} {data.year}</h2>
            </div>
            <form className="enquiry-form">
                <div className="enquiry-message">
                    <p>Enquiry: {data.message}</p>
                </div>
                <label htmlFor="enquiry-response">Response</label>
                <textarea name="enquiry-response" id="enquiry-response" ></textarea>
                <div className="enquiry-button">
                    <button>Send</button>
                </div>
                </form>
        </div>
    )
}
const dummyData = {
    enquiry_id: 1,
    user_id: 1,
    title: "hello",
    message: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    brand: "Toyota",
    model: "Camry",
    year: 2019,
    
    
}
export default function Enquiry({userId}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
      
            
    const fetchEnquiry = async () => {
        try {
            const response = await axios.post('http://localhost:5000/enquiry/getEnquiry',{status:'pending'},config);
            if (response.status === 200) {
                setData(response.data.enquiry);
                setLoading(false);
            }
        } catch (err) {
            setError(err);
            setLoading(false);

        }   
    }
    useEffect(() => {
        fetchEnquiry();
    }, []);
    return (
        <div className="enquiry-page-container">
            <div className="enquiry-page-title">
                <h1>Enquiry</h1>
            </div>
            <div className="enquiry-page-content">
                {loading && <ReactLoading type="spin" color="#000000" />}
                {error && <p>{error.message}</p>}
                {data && data.length === 0 && <p>No enquiry</p>}
                {data && data.map((item) => <EnquiryContainer data={item} key={item.enquiry_id}/>)}
                
            </div>
        </div>
    )
}