import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const { state } = useLocation();
  const selectedPackage = state?.selectedPackage;
  const exchangeRate = 365; // Mock exchange rate: 1 USD = 365 LKR

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    adults: 0,
    children: 0,
    rooms: 0,
    totalPrice: selectedPackage.price,
    totalUSD: (selectedPackage.price / exchangeRate).toFixed(2),
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: name === "adults" || name === "children" || name === "rooms" ? Number(value) : value };

    // Price breakdown
    const basePrice = selectedPackage.price;
    const adultsPrice = updatedData.adults * 450;
    const childrenPrice = updatedData.children * 450;
    const roomsPrice = updatedData.rooms * 1000;

    const totalLKR = basePrice + adultsPrice + childrenPrice + roomsPrice;

    updatedData.totalPrice = totalLKR;
    updatedData.totalUSD = (totalLKR / exchangeRate).toFixed(2); // Convert to USD
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/bookings", {
        ...formData,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
      });
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  // Calculate individual price components
  const basePriceLKR = selectedPackage.price;
  const adultsPriceLKR = formData.adults * 450;
  const childrenPriceLKR = formData.children * 450;
  const roomsPriceLKR = formData.rooms * 1000;

  // Convert LKR prices to USD
  const basePriceUSD = (basePriceLKR / exchangeRate).toFixed(2);
  const adultsPriceUSD = (adultsPriceLKR / exchangeRate).toFixed(2);
  const childrenPriceUSD = (childrenPriceLKR / exchangeRate).toFixed(2);
  const roomsPriceUSD = (roomsPriceLKR / exchangeRate).toFixed(2);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f4f4f4', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Booking for: {selectedPackage.name}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', height: '100px' }}
          ></textarea>
        </label>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Number of Adults:
          <input
            type="number"
            name="adults"
            value={formData.adults}
            onChange={handleInputChange}
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Number of Children:
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleInputChange}
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Number of Rooms:
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
            style={{ padding: '10px', fontSize: '14px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>

        {/* Display price breakdown */}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', color: '#333' }}>Price Breakdown:</h3>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Base Package Price: <strong>LKR {basePriceLKR}</strong> /{" "}
            <strong>USD {basePriceUSD}</strong>
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Additional Adults Price: <strong>LKR {adultsPriceLKR}</strong> /{" "}
            <strong>USD {adultsPriceUSD}</strong>
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Additional Children Price: <strong>LKR {childrenPriceLKR}</strong> /{" "}
            <strong>USD {childrenPriceUSD}</strong>
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Additional Rooms Price: <strong>LKR {roomsPriceLKR}</strong>
          </p>
        </div>

        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
          Total Price: LKR {formData.totalPrice} /{" "}
          <strong>USD {formData.totalUSD}</strong>
        </p>
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
          }}
        >
          Submit Booking
        </button>
      </form>

      {bookingDetails && (
        <BookingSummary booking={bookingDetails} />
      )}
    </div>
  );
};

export default BookingForm;
