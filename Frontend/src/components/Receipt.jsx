// src/components/Receipt.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Receipt = () => {
  const location = useLocation();
  const { formData, service } = location.state;

  return (
    <div className="receipt-container">
      <h2>Receipt for {service.name}</h2>
      <p>Adults Count: {formData.adultsCount}</p>
      <p>Children Count: {formData.childrenCount}</p>
      <p>Additional Details: {formData.additionalDetails}</p>
      <p>Note: {formData.note}</p>
      <p>Total Price: ${formData.price}</p>
    </div>
  );
};

export default Receipt;
