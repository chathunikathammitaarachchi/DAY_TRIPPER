import React from 'react';
import Navbar from './Navbar';  // Import the Navbar component
import './ServicesPage.css';  // Import the CSS file for styling

// Create a Service Card component
const ServiceCard = ({ title, price, adult, children, imageUrl }) => (
  <div className="service-card">
    <img src={`/images/${imageUrl}`} alt={title} className="service-image" />
    <h3 className="service-title">{title}</h3>
    <p className="service-price">{price}</p>
    {/* Render additional details only if available */}
    {adult && <p className="service-details">Adults: {adult}</p>}
    {children && <p className="service-details">Children: {children}</p>}
    <button className="add-button">Add</button> {/* Add Button */}
  </div>
);

// Main Services Page Component
const ServicesPage = () => {
  return (
    <div className="services-page">
      <Navbar />  {/* Include Navbar at the top */}
      <main>
        <h1 className="services-heading">Our Services</h1>
        <div className="service-container">
          {/* Service Cards */}
          <ServiceCard 
            title="Decorations" 
            price="5000 LKR" 
            adult="Yes" 
            children="Yes" 
            imageUrl="decoration.jpg" 
          />
          <ServiceCard 
            title="Photography" 
            price="5000 LKR" 
            imageUrl="photo.jpg" 
          />
          <ServiceCard 
            title="Buffet" 
            price="2000 LKR / 1000 LKR (Per Person)" 
            adult="Yes" 
            children="Yes" 
            imageUrl="buffet.jpg" 
          />
          <ServiceCard 
            title="Rooms" 
            price="2000 LKR (Per Room)" 
            imageUrl="room.jfif" 
          />
        </div>
        <button className="next-button">NEXT</button> {/* Navigation Button */}
      </main>
    </div>
  );
};

export default ServicesPage;
