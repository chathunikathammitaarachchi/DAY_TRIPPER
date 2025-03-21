import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './service.css' // Import Hero component

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [exchangeRate, setExchangeRate] = useState(365); // Mock exchange rate (LKR to USD)
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await axios.get("http://localhost:8080/api/packages");
    setPackages(res.data);
    setFilteredPackages(res.data); // Initially set filtered packages to all
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    if (category === "All") {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(packages.filter((pkg) => pkg.category === category));
    }
  };

  const handleSelectPackage = (pkg) => {
    navigate("/booking", { state: { selectedPackage: pkg } });
  };

  return (
    <div>
   
      <h1>Available Packages</h1>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => handleFilterChange("Food")}>Food</button>
        <button onClick={() => handleFilterChange("Decoration")}>Decoration</button>
        <button onClick={() => handleFilterChange("Photography")}>Photography</button>
        <button onClick={() => handleFilterChange("All")}>All</button>
      </div>

      {/* Package List Grid */}
      <div className="package-gallery">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            {/* Package Card */}
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <p className="price">Price: LKR {pkg.price} / USD {(pkg.price / exchangeRate).toFixed(2)}</p>

            {/* Display extra details based on package category */}
            {pkg.category === "Food" && (
              <>
                <p>Food Type: {pkg.foodType}</p>
                <p>Price per Plate (Adult): LKR {pkg.pricePerPlateAdult} USD {(pkg.pricePerPlateAdult / exchangeRate).toFixed(2)}</p>
                <p>Price per Plate (Child): LKR {pkg.pricePerPlateChild}  USD {(pkg.pricePerPlateChild / exchangeRate).toFixed(2)}</p>
              </>
            )}

            {pkg.category === "Decoration" && <p>Theme Type: {pkg.themeType}</p>}

            {pkg.category === "Photography" && <p>Photos Included: {pkg.photosIncluded}</p>}

            {/* Book Now Button */}
            <button onClick={() => handleSelectPackage(pkg)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
