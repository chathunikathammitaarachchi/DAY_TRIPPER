import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './ServiceForm.css';

const ServiceForm = () => {
  const { serviceName } = useParams();
  const { state } = useLocation();
  const { service } = state || {};
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    adults: 0,
    children: 0,
    numberOfPhotographers: 0,
    eventHours: 0,
    roomsRequired: 0,
    eventStyle: '',
    additionalEquipment: '',
    specialNotes: '',
  });

  const calculateTotal = () => {
    const basePrice = service.price || 0;
    const perPersonPrice = service.perPerson || 0;
    const totalPeople = parseInt(formDetails.adults) + parseInt(formDetails.children);
    return basePrice + totalPeople * perPersonPrice;
  };

  const handleReview = () => {
    const totalPrice = calculateTotal();
    const reviewData = { serviceName, formDetails, totalPrice, service };
    navigate('/service-review', { state: { reviewData } }); // Navigate with state
  };

  return (
    <div className="service-form-container">
      <h2>{serviceName} Service Form</h2>
      <form className="service-form">
        {serviceName === 'Photography' && (
          <>
            <label>
              Number of Photographers:
              <input
                type="number"
                value={formDetails.numberOfPhotographers}
                onChange={(e) => setFormDetails({ ...formDetails, numberOfPhotographers: e.target.value })}
              />
            </label>
            <label>
              Event Hours:
              <input
                type="number"
                value={formDetails.eventHours}
                onChange={(e) => setFormDetails({ ...formDetails, eventHours: e.target.value })}
              />
            </label>
            <label>
              Additional Equipment:
              <input
                type="text"
                value={formDetails.additionalEquipment}
                onChange={(e) => setFormDetails({ ...formDetails, additionalEquipment: e.target.value })}
              />
            </label>
          </>
        )}

        {serviceName === 'Buffet' && (
          <>
            <label>
              Number of Adults:
              <input
                type="number"
                value={formDetails.adults}
                onChange={(e) => setFormDetails({ ...formDetails, adults: e.target.value })}
              />
            </label>
            <label>
              Number of Children:
              <input
                type="number"
                value={formDetails.children}
                onChange={(e) => setFormDetails({ ...formDetails, children: e.target.value })}
              />
            </label>
          </>
        )}

        {serviceName === 'Decoration' && (
          <>
            <label>
              Event Style:
              <input
                type="text"
                value={formDetails.eventStyle}
                onChange={(e) => setFormDetails({ ...formDetails, eventStyle: e.target.value })}
              />
            </label>
          </>
        )}

        {serviceName === 'Rooms' && (
          <>
            <label>
              Number of Rooms Required:
              <input
                type="number"
                value={formDetails.roomsRequired}
                onChange={(e) => setFormDetails({ ...formDetails, roomsRequired: e.target.value })}
              />
            </label>
          </>
        )}

        <label>
          Special Notes:
          <textarea
            value={formDetails.specialNotes}
            onChange={(e) => setFormDetails({ ...formDetails, specialNotes: e.target.value })}
          ></textarea>
        </label>

        {/* Review Button */}
        <button type="button" onClick={handleReview}>
          Review & Confirm
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
