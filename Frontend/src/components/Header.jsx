import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Day Tripper</div>
      <nav className="navbar">
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="/packages">Packages</a></li>
          <li><a href="#photogallery">Portfolio</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <button className="cta-button">Book Now</button>
    </header>
  );
};

export default Header;
