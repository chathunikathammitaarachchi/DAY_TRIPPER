import React from 'react';
import './service.css';

import decoration from '../../assets/images/decoration.jpg';
import buffet from '../../assets/images/buffet.jpeg';
import photography from '../../assets/images/photography.jpg';
import room from '../../assets/images/room.jpg';

const services = [
  { name: "Decoration", image: decoration, description: "Elegant event decor tailored to your needs." },
  { name: "Buffet", image: buffet, description: "Delicious menus for all tastes." },
  { name: "Photography", image: photography, description: "Professional photography to capture your moments." },
  { name: "Room", image: room, description: "Comfortable rooms for your stay." },
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
