import React from 'react';
import Slider from 'react-slick';
import './Hero.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BookingForm.jsx";


import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';

const Hero = () => {
  
  const images = [image1, image2, image3, image4, image5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <section id="hero" className="hero">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
      <div className="hero-overlay">
        <div className="hero-content">
        <h1>Your Perfect Day, Just a Click Away!</h1>
        <h6>Incredible last-minute hotel deals.</h6>
        
        </div>
      </div>
    </section>
  );
};

export default Hero;
