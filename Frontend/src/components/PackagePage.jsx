import React, { useEffect, useState } from "react";

const PackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  // Fetch packages from the backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/packages/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch packages.");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError("Failed to fetch packages.");
      }
    };

    fetchPackages();
  }, []);


  // Add package to cart
  const addToCart = async (pkg) => {
    try {
      const response = await fetch("http://localhost:8080/api/cart/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // Replace with dynamic user ID
          package: pkg,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
     
    }
  };

  // Remove package from cart
  const removeFromCart = async (pkgId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/remove/${pkgId}`, {
        method: "DELETE",
        
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart.");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart.");
    }
  };

  // UI for the Package Page
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Packages</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {packages.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                width: "250px",
                textAlign: "center",
              }}
            >
              <h3>{pkg.packageType || "No type available"}</h3>
              <p>{pkg.description || "No description available"}</p>
              <p>Category: {pkg.category || "Not specified"}</p>
              <p>Price: ${pkg.price}</p>
              <button onClick={() => addToCart(pkg)}>Remove</button>
              <button onClick={() => addToCart(pkg)}>Update</button>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}

     
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <p>{item.package.packageType} - {item.package.price}</p>
              <button onClick={() => removeFromCart(item.package.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PackagePage;
