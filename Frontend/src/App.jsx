import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Summary from "./Components/Hotel/BookingSummary";
import BookingForm from "./Components/Hotel/BookingForm";
import Homepage from "./Components/Hotel/CalenderBookingForm";
import AdminPanel from "./Components/Hotel/AdminPanel";
import Service from "./Components/Hotel/Hero";
import FQ from "./Components/Hotel/CustomerSupport"
import Review from "./Components/Review/Review"

import ContactUs from "./Components/Hotel/Contact.Us";
import Header from "./Components/Hotel/Header";



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      
        <Route path="/service" element={<Service />} />
        <Route path="/support" element={<FQ />} />
        <Route path="/Review" element={<Review/>} />
       
        <Route path="/contactus" element={<ContactUs/>} />
     
       
      </Routes>
    </Router>
  );
}

export default App;
