import React from "react";
import "./GalleryStyles.css";

const Modal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Enlarged view" />
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
