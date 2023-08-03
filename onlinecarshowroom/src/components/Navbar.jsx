import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
export default function Navbar(){
  const location = useLocation().pathname;
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location === '/');
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
              <NavLink route="/login" text="Login" />
              <NavLink route="/signup" text="Sign Up" />
              <div className="menu-bar">
                  <BarIcon />
              </div>
          </div>
      </div>
    </>
  );
}