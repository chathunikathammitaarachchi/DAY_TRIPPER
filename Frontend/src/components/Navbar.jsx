// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add some styling here

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Day Tripper</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/service-form">Add Service</Link></li>
        <li><Link to="/receipt">Receipt</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
