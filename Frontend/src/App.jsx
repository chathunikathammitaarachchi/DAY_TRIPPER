// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Services from './components/Services';
import ServiceForm from './components/ServiceForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Services />} />
          {/* This route is for the dynamic service form */}
          <Route path="/service-form/:serviceName" element={<ServiceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
