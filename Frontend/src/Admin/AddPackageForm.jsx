import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

const AddPackageForm = () => {
  const [packageType, setPackageType] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [error, setError] = useState("");

  const handlePackageTypeChange = (e) => {
    setPackageType(e.target.value);
    setPrice(600); // Reset price on package type change
  };

  const handlePriceChange = (e) => {
    const selectedOption = e.target.value;
    setCategory(selectedOption);
    if (selectedOption === "silver") setPrice(600);
    if (selectedOption === "gold") setPrice(1000);
    if (selectedOption === "platinum") setPrice(1500);
  };

  const handleAdditionalDetails = (key, value) => {
    setAdditionalDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      packageType,
      category,
      price,
      additionalDetails: JSON.stringify(additionalDetails),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/packages/add", formData);
      console.log("Package added successfully:", response.data);
    } catch (error) {
      console.error("Error adding package:", error);
      setError("Error adding package.");
    }
  };
  

  return (
    <form className="package-form" onSubmit={handleSubmit}>
      <h2>Add Package</h2>

      {/* Select Package Type */}
      <label>
        Package Type:
        <select onChange={handlePackageTypeChange}>
          <option value="">Select Package Type</option>
          <option value="buffet">Buffet</option>
          <option value="decoration">Decoration</option>
          <option value="photography">Photography</option>
          <option value="room">Room</option>
        </select>
      </label>

      {/* Fields for different package types */}
      {packageType === "buffet" && (
        <>
          <label>
            Cuisine Type:
            <select onChange={(e) => handleAdditionalDetails("cuisineType", e.target.value)}>
              <option value="continental">Continental</option>
              <option value="asian">Asian</option>
              <option value="local">Local</option>
            </select>
          </label>

          <label>
            Live Cooking Stations:
            <select onChange={(e) => handleAdditionalDetails("liveCookingStations", e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </>
      )}

      {packageType === "decoration" && (
        <>
          <label>
            Floral Arrangements:
            <select onChange={(e) => handleAdditionalDetails("floralArrangements", e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label>
            Event Styling:
            <select onChange={(e) => handleAdditionalDetails("eventStyling", e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </>
      )}

      {packageType === "photography" && (
        <>
          <label>
            Hours:
            <select onChange={(e) => setPrice(e.target.value * 200)}>
              <option value="4">4 Hours</option>
              <option value="6">6 Hours</option>
              <option value="8">8 Hours</option>
            </select>
          </label>

          <label>
            Drone Photography:
            <select onChange={(e) => handleAdditionalDetails("dronePhotography", e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </>
      )}

      {packageType === "room" && (
        <>
          <label>
            Amenities:
            <input type="checkbox" onChange={(e) => handleAdditionalDetails("premiumBedding", e.target.checked)} /> Premium Bedding
            <input type="checkbox" onChange={(e) => handleAdditionalDetails("miniBar", e.target.checked)} /> Mini-Bar
            <input type="checkbox" onChange={(e) => handleAdditionalDetails("airConditioning", e.target.checked)} /> Air Conditioning
          </label>

          <label>
            Special Room Setup:
            <select onChange={(e) => handleAdditionalDetails("specialRoomSetup", e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </>
      )}

      {/* Common Price Section */}
      {packageType && (
        <>
          <label>
            Package Category:
            <select onChange={handlePriceChange}>
              <option value="silver">Silver Package</option>
              <option value="gold">Gold Package</option>
              <option value="platinum">Platinum Package</option>
            </select>
          </label>

          <label>
            Price: ${price}
          </label>

          <button type="submit">Add to cart</button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddPackageForm;
