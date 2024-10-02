import React from 'react';
import './Navbar.css'; // Create a CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1>Day Tripper</h1>
            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/logout">Logout</a>
            </div>
            <div className="user-profile">
                <img src="/path/to/user/profile.png" alt="User Profile" />
            </div>
        </nav>
    );
};

export default Navbar;
