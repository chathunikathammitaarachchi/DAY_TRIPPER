// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Services from './components/Services';
import ServiceForm from './components/ServiceForm';
import ServiceReview from './components/ServiceReview';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Main Services Page Route */}
          <Route path="/" element={<Services />} />

          {/* Dynamic Route for Service Form based on Service Name */}
          <Route path="/service-form/:serviceName" element={<ServiceForm />} />

          {/* Route for Reviewing the Service Details */}
          <Route path="/service-review" element={<ServiceReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
