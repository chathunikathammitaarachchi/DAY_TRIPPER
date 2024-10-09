import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ServiceReview.css';

const ServiceReview = () => {
  const { state } = useLocation();
  const { reviewData } = state || {};
  const { serviceName, formDetails, totalPrice, service } = reviewData || {};
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert(`Service: ${serviceName} confirmed with total price: $${totalPrice}`);
  };

  const handleEdit = () => {
    navigate(-1); // Go back to the form
  };

  const handleRemove = () => {
    navigate('/'); // Redirect back to the services page
  };

  return (
    <div className="review-container">
      <h2>Review Your {serviceName} Service</h2>
      <div className="review-details">
        <p><strong>Service:</strong> {serviceName}</p>
        <p><strong>Base Price:</strong> ${service.price}</p>
        <p><strong>Per Person Cost:</strong> ${service.perPerson}</p>
        <h3>Details Entered:</h3>
        {Object.entries(formDetails).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
        <h3>Total Price: ${totalPrice}</h3>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
      <button className="edit-button" onClick={handleEdit}>Edit</button>
      <button className="remove-button" onClick={handleRemove}>Remove Service</button>
    </div>
  );
};

export default ServiceReview;
