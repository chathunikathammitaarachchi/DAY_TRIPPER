import { useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios'; // Import axios for API calls
import { Calendar } from 'react-feather'; // Import Calendar icon (assuming you are using react-feather)
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"

import image11 from "../../assets/images/image11.jpg";
import image12 from "../../assets/images/image12.jpg";
import image13 from "../../assets/images/image13.jpg";
import image14 from "../../assets/images/image14.jpg";
import image15 from "../../assets/images/image15.jpg";

const CalenderBookingForm = () => {
  // State hooks
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSlotAvailable, setIsSlotAvailable] = useState(true); // Slot availability flag

  // Event types (you can dynamically fetch or modify as needed)
  const events = ['Birthday', 'Conference', 'Bride-to-be', 'Meet-up'];

  // Initialize navigate from react-router-dom
  const navigate = useNavigate();

  // Generate available time slots (9 AM to 8 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 20; i++) {
      slots.push(`${i}:00 - ${i + 2}:00`);
    }
    return slots;
  };

  // Check if the selected slot is available
  const checkAvailability = async (event, date, time) => {
    try {
      const response = await axios.post('http://localhost:8080/api/booking/check-availability', {
        event,
        date,
        time
      });
      setIsSlotAvailable(response.data); // Update availability state
    } catch (error) {
      console.error('Error checking availability:', error);
      setIsSlotAvailable(false); // In case of error, assume slot is unavailable
    }
  };

  // Submit the booking if available
  const handleSubmit = async () => {
    if (!selectedEvent || !selectedDate || !selectedTime) {
      alert('Please fill all fields before submitting.');
      return;
    }

    // Check slot availability first
    await checkAvailability(selectedEvent, selectedDate, selectedTime);

    if (!isSlotAvailable) {
      alert('The selected time slot is already booked. Please choose another time.');
      return;
    }

    // If available, submit the booking to the backend
    const newBooking = { event: selectedEvent, date: selectedDate, time: selectedTime };
    try {
      await axios.post('http://localhost:8080/api/booking', newBooking);
      alert('Booking saved successfully!');

      // Redirect to the service page after successful booking
      navigate('/service'); // Change this to the actual route of your service page
    } catch (error) {
      alert('Error saving booking. Please try again later.');
      console.error('Error submitting booking:', error);
    }
  };

  // Slider settings
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
      {/* Slider for hero images */}
      <Slider {...settings}>
        {[image11, image12, image13, image14, image15].map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>

      <div className="booking-content animate-fadeIn">
        <h1 className="booking-title">Your Perfect day,</h1>
        <h2 className="booking-subtitle">Just a click away..!</h2>
        <p className="booking-description">Incredible last-minute hotel deals</p>

        <div className="form-container">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Event:</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="form-select"
              >
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">When:</label>
              <div className="calendar-wrapper">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-input"
                />
                <Calendar className="calendar-icon" size={20} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Time:</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="form-select"
              >
                <option value="">Select Time</option>
                {generateTimeSlots().map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button onClick={handleSubmit} className="submit-button">
                GO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderBookingForm;
