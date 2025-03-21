import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking }) => {
  const exchangeRate = 365; // Mock exchange rate: 1 USD = 365 LKR
  const [showPopup, setShowPopup] = useState(false); // State to handle popup visibility
  const navigate = useNavigate(); // To handle redirection to home page

  if (!booking) {
    return <p>No booking details available.</p>;
  }

  // Convert the total price from LKR to USD (if needed)
  const totalUSD = (booking.totalPrice / exchangeRate).toFixed(2); // Convert LKR to USD

  const handleOkClick = () => {
    setShowPopup(true); // Show the popup when OK is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
    navigate("/"); // Redirect to home page (change "/" if needed)
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
      <h2>Booking Summary</h2>
      {/* Display event, date, and time */}
      <p><strong>Event:</strong> {booking.event}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time:</strong> {booking.time}</p>

      <p><strong>Full Name:</strong> {booking.name}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
      <p><strong>Address:</strong> {booking.address}</p>
      <p><strong>Number of Adults:</strong> {booking.adults}</p>
      <p><strong>Number of Children:</strong> {booking.children}</p>
      <p><strong>Number of Rooms:</strong> {booking.rooms}</p>

      {/* Total Price in LKR and USD */}
      <p>
        <strong>Total Price:</strong> LKR {booking.totalPrice.toFixed(2)} / USD {totalUSD}
      </p>

      <p><strong>Status:</strong> {booking.status}</p>

      {/* OK button */}
      <button
        onClick={handleOkClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        OK
      </button>

      {/* Popup message */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: '#fff',
            border: '2px solid #4CAF50',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            zIndex: '1000'
          }}
        >
          <h3>Your booking is pending now.</h3>
          <p>Check your email in 1 hour for updates.</p>
          <button
            onClick={handleClosePopup}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
