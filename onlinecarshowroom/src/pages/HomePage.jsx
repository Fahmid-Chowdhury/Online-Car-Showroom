import "./homepage.css";
import { Link } from "react-router-dom";


function HomeSection(){
    return(
        <>
        <div className="home-container home">
            <div className="hero-text">
                <h5>Your Ultimate Car Destination</h5>
                <h1> Buy<br></br> Your Dream <br></br>Car Today</h1>
                <p>At our car showroom, we take pride in offering a captivating automotive <br></br>experience like no other. Whether you're seeking the thrill of a lifetime <br></br>or the perfect companion for everyday adventures.</p>
                <div className="btn-group">
                    <Link to="/cars" className="btn">Buy Car</Link>
                    {/* <Link to="/rent" className="btn">Rent Car</Link> */}
                </div>
            </div>
        </div>
        </>
    );
}

export default function HomePage (){
    return(
        <>
        
        <HomeSection />
        
        </>
    );
}

