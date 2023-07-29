import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className='w-[300px] bg-gray-900 text-white '>
        <div>
          
        </div>
        <div className='nav-button-container'>
          <button className = 'nav-button'>Sign Up</button>
          <button className = 'nav-button'>Sign In</button>
        </div>

        <nav>
          <div className='flex flex-col justify-between m-10'>
            
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/car"className='nav-link'>Browse Cars</Link>
            <Link to="/services"className='nav-link'>Services</Link>
            <Link to="/contact"className='nav-link'>Contact</Link>
          </div>
        </nav>

      </div>
    </>
  );
}