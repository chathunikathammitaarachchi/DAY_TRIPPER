import React from 'react';
import './Services.css';

const services = [
  { name: "Decoration", image: "decoration.jpg", description: "Elegant event decor tailored to your needs." },
  { name: "Buffet", image: "buffet.jpeg", description: "Delicious menus for all tastes." },
  { name: "Photography", image: "photography.jpg", description: "Professional photography to capture your moments." },
  { name: "Room", image: "room.jpg", description: "Comfortable rooms for your stay." },
];

const Services = () => {
  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.name} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
