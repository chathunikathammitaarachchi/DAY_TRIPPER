import React from 'react';
import Slider from 'react-slick';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from './Services';
import Reviews from './Reviews'; 
import Footer from './Footer';
import PhotoGallery from './PhotoGallery';
import PackageList from './PackageList'



// Import local images
import image1 from '../../assets/images/image1.jfif';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';
import image5 from '../../assets/images/image5.jpeg';

const Hero = () => {
  // Use imported images in an array
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
    <div>
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
          <h1>Make Your Event Unforgettable</h1>
          <p>Discover premium event services tailored to your needs.</p>
          <button className="cta-button">Add your Packages</button>
        </div>
      </div>
    </section>
    <Services/>
<PackageList/>
<PhotoGallery/>
<Reviews/>
<Footer/>
    </div>
  );
};

export default Hero;
