import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import decorationImg from '../images/decoration.jpg';
import photographyImg from '../images/photography.jpg';
import buffetImg from '../images/buffet.jpg';
import roomsImg from '../images/rooms.jpg';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, name: 'Decoration', description: 'Elegant and customizable decoration services for any occasion.', image: decorationImg, price: 5000, perPerson: 200 },
    { id: 2, name: 'Photography', description: 'Professional photography to capture your special moments.', image: photographyImg, price: 8000, perPerson: 500 },
    { id: 3, name: 'Buffet', description: 'Delicious buffet options for a variety of events and gatherings.', image: buffetImg, price: 2000, perPerson: 100 },
    { id: 4, name: 'Rooms', description: 'Comfortable and well-furnished rooms to accommodate your guests.', image: roomsImg, price: 3000, perPerson: 0 },
  ];

  // Use the service name for navigation
  const handleAddService = (service) => {
    navigate(`/service-form/${service.name}`, { state: { service } });
  };

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button onClick={() => handleAddService(service)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
