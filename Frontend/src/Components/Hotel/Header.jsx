import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './service.css';
import logo from '../../assets/images/logo.jpg'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={logo} alt="Day Tripper Logo" className="logo-img" />
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#services">Services</Link></li>
          <li><Link to="/packages">Packages</Link></li>
          <li><Link to="#photogallery">Portfolio</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/contactus">Contact</Link></li>
        </ul>
      </nav>
      <button className="cta-button">Book Now</button>
    </header>
  );
};

export default Header;
