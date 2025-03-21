import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components for styling
const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-top: 20px;
  color: #555;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f9f9f9;
`;

const TextareaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f9f9f9;
  height: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #008cff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 20px;
  
  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const PackageItem = styled.div`
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
`;

const PackageTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
`;

const PackageDescription = styled.p`
  color: #555;
`;

const TotalRevenue = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
`;

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    price: "",
    category: "Food", // Default to "Food"
    foodType: "",
    pricePerPlateAdult: "",
    pricePerPlateChild: "",
    themeType: "",
    photosIncluded: "",
  });
  const [editingPackage, setEditingPackage] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(365); // Mock exchange rate (LKR to USD)

  useEffect(() => {
    fetchPackages();
    fetchBookings();
  }, []);

  const fetchPackages = async () => {
    const res = await axios.get("http://localhost:8080/api/packages");
    setPackages(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:8080/api/bookings");
    setBookings(res.data);
  };

  const handleAddOrUpdatePackage = async () => {
    try {
      if (editingPackage) {
        await axios.patch(`http://localhost:8080/api/packages/${editingPackage.id}`, newPackage);
      } else {
        await axios.post("http://localhost:8080/api/packages", newPackage);
      }
      setNewPackage({
        name: "",
        description: "",
        price: "",
        category: "Food",
        foodType: "",
        pricePerPlateAdult: "",
        pricePerPlateChild: "",
        themeType: "",
        photosIncluded: "",
      });
      setEditingPackage(null);
      fetchPackages();
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleDeletePackage = async (_id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`http://localhost:8080/api/packages/${_id}`);
        fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const handleEditPackage = (pkg) => {
    setNewPackage(pkg);
    setEditingPackage(pkg);
  };

  const handleCategoryChange = (e) => {
    setNewPackage({ ...newPackage, category: e.target.value });
  };

  const handleUpdateBookingStatus = async (id, status, email, phoneNumber) => {
    let rejectionReason = "";
    if (status === "Rejected") {
      rejectionReason = prompt("Please provide a reason for rejection:");
      if (!rejectionReason) {
        alert("Rejection reason is required.");
        return;
      }
    }

    try {
      await axios.patch(`http://localhost:8080/api/bookings/${id}`, { status, rejectionReason });
      alert(`Booking status updated to ${status}. Notification sent to ${email}`);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const calculateTotalPrices = () => {
    const totalLKR = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const totalUSD = (totalLKR / exchangeRate).toFixed(2);
    return { totalLKR, totalUSD };
  };

  const { totalLKR, totalUSD } = calculateTotalPrices();

  return (
    <Container>
      <Heading>Admin Panel</Heading>

      {/* Add/Edit Package Section */}
      <div>
        <SectionHeading>{editingPackage ? "Edit Package" : "Add Package"}</SectionHeading>
        <label>Category</label>
        <select onChange={handleCategoryChange} value={newPackage.category}>
          <option value="Food">Food</option>
          <option value="Decoration">Decoration</option>
          <option value="Photography">Photography</option>
        </select>

        <InputField
          type="text"
          placeholder="Package Name"
          value={newPackage.name}
          onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
        />

        <TextareaField
          placeholder="Description"
          value={newPackage.description}
          onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
        />

        <InputField
          type="number"
          placeholder="Price (LKR)"
          value={newPackage.price}
          onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
        />

        {newPackage.category === "Food" && (
          <>
            <InputField
              type="text"
              placeholder="Food Type (e.g., Birthday)"
              value={newPackage.foodType}
              onChange={(e) => setNewPackage({ ...newPackage, foodType: e.target.value })}
            />
            <InputField
              type="number"
              placeholder="Price per Plate (Adult)"
              value={newPackage.pricePerPlateAdult}
              onChange={(e) => setNewPackage({ ...newPackage, pricePerPlateAdult: e.target.value })}
            />
            <InputField
              type="number"
              placeholder="Price per Plate (Child)"
              value={newPackage.pricePerPlateChild}
              onChange={(e) => setNewPackage({ ...newPackage, pricePerPlateChild: e.target.value })}
            />
          </>
        )}

        {newPackage.category === "Decoration" && (
          <InputField
            type="text"
            placeholder="Theme Type"
            value={newPackage.themeType}
            onChange={(e) => setNewPackage({ ...newPackage, themeType: e.target.value })}
          />
        )}

        {newPackage.category === "Photography" && (
          <InputField
            type="number"
            placeholder="Number of Photos Included"
            value={newPackage.photosIncluded}
            onChange={(e) => setNewPackage({ ...newPackage, photosIncluded: e.target.value })}
          />
        )}

        <Button onClick={handleAddOrUpdatePackage}>
          {editingPackage ? "Update Package" : "Add Package"}
        </Button>
      </div>

      {/* Manage Packages Section */}
      <div>
        <SectionHeading>Manage Packages</SectionHeading>
        {packages.map((pkg) => (
          <PackageItem key={pkg.id}>
            <PackageTitle>{pkg.name}</PackageTitle>
            <PackageDescription>{pkg.description}</PackageDescription>
            <p>Price: LKR {pkg.price}</p>
            <Button onClick={() => handleEditPackage(pkg)}>Edit</Button>
            <Button onClick={() => handleDeletePackage(pkg.id)}>Delete</Button>
          </PackageItem>
        ))}
      </div>

      {/* Booking History Section */}
      <div>
        <SectionHeading>All Booking History</SectionHeading>
        <TotalRevenue>Total Revenue: LKR {totalLKR} / USD {totalUSD}</TotalRevenue>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <p><strong>Package:</strong> {booking.packageName}</p>
            <p><strong>Full Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
            <p><strong>Address:</strong> {booking.address}</p>
            <p><strong>Adults:</strong> {booking.adults}</p>
            <p><strong>Children:</strong> {booking.children}</p>
            <p><strong>Rooms:</strong> {booking.rooms}</p>
            <p><strong>Total Price:</strong> LKR {booking.totalPrice} / USD {(booking.totalPrice / exchangeRate).toFixed(2)}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <Button onClick={() => handleUpdateBookingStatus(booking.id, "Confirmed", booking.email, booking.phoneNumber)}>Confirm</Button>
            <Button onClick={() => handleUpdateBookingStatus(booking.id, "Rejected", booking.email, booking.phoneNumber)}>Reject</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AdminPanel;
