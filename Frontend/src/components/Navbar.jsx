import React from 'react';
import './Navbar.css';  // Import the CSS file for styling

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/Logo.png" alt="Day Tripper Logo" className="logo" />  {/* Add your logo image */}
      </div>
      <div className="navbar-right">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/logout">Logout</a>
        <img src="/images/user.png" alt="User Profile" className="user-profile" /> {/* Add a profile image */}
      </div>
    </nav>
  );
};

export default Navbar;
