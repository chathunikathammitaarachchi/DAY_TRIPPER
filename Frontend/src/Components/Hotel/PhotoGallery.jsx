import React, { useState } from "react";
import Modal from "./Modal";
import "./service.css";
import image1 from "../../assets/images/image1.jfif";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpeg";
import image6 from "../../assets/images/image6.jpg";
import image7 from "../../assets/images/image7.jpg";
import image8 from "../../assets/images/image8.jpg";
import image9 from "../../assets/images/image9.jpg";
import image10 from "../../assets/images/image10.jpg";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: image1, description: "Birthday Party Celebration" },
    { src: image2, description: "Elegant Wedding Ceremony" },
    { src: image3, description: "Corporate Event Setup" },
    { src: image4, description: "Wedding Photography Showcase" },
    { src: image5, description: "Buffet Setup with Lavish Spread" },
    { src: image6, description: "Luxurious Buffet Decoration" },
    { src: image7, description: "Pink-themed Girl’s Birthday Party" },
    { src: image8, description: "Gold-Themed Wedding Reception" },
    { src: image9, description: "Professional Event Photography" },
    { src: image10, description: "Business Meeting Arrangement" },
  ];

  
  

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h2>View Our Portfolio</h2>
      <p>Explore some of our recent work and envision your event with our services.</p>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openModal(image.src)}
          >
            <img src={image.src} alt={`Gallery ${index + 1}`} />
            <div className="overlay">
              <p className="description">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && <Modal image={selectedImage} closeModal={closeModal} />}
    </div>
  );
};

export default PhotoGallery;
