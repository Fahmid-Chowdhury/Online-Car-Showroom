import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import './navbar.css';


function BarIcon(){
  return(
      <>
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" fill="currentColor" viewBox="0 0 512 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
      </svg>
      </>
  );
}
function NavLink({route, text}) {
  return(
      <li><Link to={route} className="nav-link">
          {text}
      </Link></li>
  );
}
const handleSignOut = (fnc) => {
  // Remove the JWT token from local storage
  localStorage.removeItem('token');

  // Redirect the user to the login page
  fnc('/login');
};
export default function Navbar(){
  const navigate = useNavigate(); // Use history for navigation
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [userName, setUserName] = useState('');
  const [showMiniBar, setShowMiniBar] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
    
    // Fetch user's name from localStorage (assuming you store the token as 'token')
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get user data
      const decodedToken = jwt_decode(token);
      setUserName(decodedToken.name);
      setUserRole(decodedToken.role);
    }
  }, [location]);
  return(
    <>
      <div className={`heading ${isHomePage ? 'heading-home' : ""}`}>
          <div className="logo">
              <NavLink route="/" text={<span>Car <span className="logo-diff">Showroom</span></span>} />
          </div>
          <div className="navbar">
              <NavLink route="/" text="Home" />
              <NavLink route="/cars" text="Buy car" />
              <NavLink route="/rent" text="Rent car" />
              <NavLink route="/services" text="Services" />
              <NavLink route="/about" text="About Us" />
          </div>
          <div className="right-float">
            {userName ? (
              <>
              <div className="user-container">
                <div className="user-name">
                  <span>Welcome, {userName}</span>
                </div>
                <div className="loggedin-container">
                  {userRole === 'admin' && <Link to="/dashboard"><span>Dashboard</span></Link> }
                  <Link to="/profile"><span>Profile</span></Link>
                  <span className="signout" onClick={() => handleSignOut(navigate)}>Sign Out</span>
                </div>
                </div>
              </>
            ):(
              <>
                <NavLink route="/login" text="Login" />
                <NavLink route="/signup" text="Sign Up" />
              </>
            )}
          </div>
          
      </div>
    </>
  );
}

// 