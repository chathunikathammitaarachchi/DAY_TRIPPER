import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookingForm.css"; // Correct CSS import

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function BookingForm() {
  const [id, setId] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const result = await axios.get("http://localhost:8080/api/bookings");
      const formattedBookings = result.data.map((booking) => {
        const eventDate = new Date(`${booking.date}T${booking.time}`);
        const eventEndTime = new Date(eventDate);
        eventEndTime.setHours(eventEndTime.getHours() + 1); // Assuming events last 1 hour

        return {
          id: booking.id,
          title: booking.event,
          start: eventDate,
          end: eventEndTime,
        };
      });
      setBookings(formattedBookings);
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  }

  function checkAvailability(selectedDate, selectedTime) {
    const selectedDateTime = format(new Date(`${selectedDate}T${selectedTime}`), "yyyy-MM-dd HH:mm");

    const isBooked = bookings.some(
      (booking) => format(booking.start, "yyyy-MM-dd HH:mm") === selectedDateTime
    );

    if (isBooked) {
      setAvailabilityMessage("This date and time is already booked. Please choose another.");
    } else {
      setAvailabilityMessage("");
    }
  }

  async function saveBooking(e) {
 
   
    try {
      const newBooking = { event, date, time };
      await axios.post("http://localhost:8080/api/bookings", newBooking);
      alert("Booking saved successfully.");
      clearForm();
      loadBookings();
    } catch (err) {
      console.error("Error saving booking:", err);
      alert(`Failed to save booking: ${err.response?.data?.message || err.message}`);
    }
  }

  function clearForm() {
    setId("");
    setEvent("");
    setDate("");
    setTime("");
    setAvailabilityMessage("");
  }

  return (
    <div className="booking-form">
      <div className="container mt-4">

        <h3 className="mt-5">Bookings Calendar</h3>
        <Calendar
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px 0" }}
        />
      </div>
      
    </div>

    
  );
}

export default BookingForm;
