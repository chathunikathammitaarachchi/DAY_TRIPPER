import React, { useState } from "react";
import Modal from "./Modal";
import "./GalleryStyles.css";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "image1.jpg", description: "Birthday Party Celebration" },
    { src: "image2.jpg", description: "Elegant Wedding Ceremony" },
    { src: "image3.jpg", description: "Corporate Event Setup" },
    { src: "image4.jpg", description: "Wedding Photography Showcase" },
    { src: "image5.jpg", description: "Buffet Setup with Lavish Spread" },
    { src: "image6.jpg", description: "Luxurious Buffet Decoration" },
    { src: "image7.jpg", description: "Pink-themed Girl’s Birthday Party" },
    { src: "image8.jpg", description: "Gold-Themed Wedding Reception" },
    { src: "image9.jpg", description: "Professional Event Photography" },
    { src: "image10.jpg", description: "Business Meeting Arrangement" },
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
