import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., sending data to an API
    alert('Form submitted!');
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inquiryType">Inquiry Type</label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Reservation">Reservation</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Inline CSS Styling */}
      <style>{`
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f7fc;
          color: #333;
        }

        .contact-container {
          max-width: 900px;
          margin: 50px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          font-size: 2rem;
          color: #333;
          margin-bottom: 30px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 1rem;
          margin-bottom: 5px;
          color: #555;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-top: 5px;
          width: 100%;
        }

        .form-group textarea {
          height: 150px;
          resize: vertical;
        }

        button {
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          padding: 12px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          align-self: center;
        }

        button:hover {
          background-color: #0056b3;
        }

        /* Responsive Styling */
        @media (max-width: 768px) {
          .contact-container {
            padding: 15px;
          }

          h1 {
            font-size: 1.5rem;
          }

          .form-group label {
            font-size: 0.9rem;
          }

          .form-group input,
          .form-group select,
          .form-group textarea {
            font-size: 0.9rem;
          }

          button {
            font-size: 0.9rem;
            padding: 10px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
