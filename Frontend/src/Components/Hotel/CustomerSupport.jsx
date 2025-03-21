import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerSupport() {
  const [categories, setCategories] = useState([]); 
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        console.log(response.data); 
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const toggleItem = (categoryId, itemIndex) => {
    setExpandedItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === itemIndex ? null : itemIndex,
    }));
  };

  return (
    <div className="customer-support">
      <h1 className="customer-support-title">Welcome To Help Center</h1>
      <h2 className="customer-support-subtitle">Explore Help Articles</h2>
      <div className="customer-support-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="customer-support-card">
              <h3 className="customer-support-card-title">
                {category.title}
              </h3>
              <ul className="customer-support-card-list">
                {category.items?.map((item, idx) => (
                  <li
                    key={idx}
                    className={`customer-support-card-item ${
                      expandedItems[category.id] === idx ? "expanded" : ""
                    }`}
                    onClick={() => toggleItem(category.id, idx)}
                  >
                    {item}
                    <div
                      className={`customer-support-item-description ${
                        expandedItems[category.id] === idx ? "visible" : ""
                      }`}
                    >
                      <p>Detailed Answer for "{item}" is displayed here.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      {/* Inline CSS Styling */}
      <style>{`
        .customer-support {
          padding: 3rem;
          font-family: 'Arial', sans-serif;
          background-color: #f7f4e9;
        }

        .customer-support-title {
          font-size: 3rem;
          text-align: center;
          color: #333;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .customer-support-subtitle {
          font-size: 1.6rem;
          text-align: center;
          color: #666;
          margin-bottom: 3rem;
          font-weight: 400;
        }

        .customer-support-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .customer-support-card {
          background-color: #f4e894;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1.5rem;
          width: 280px;
          text-align: left;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .customer-support-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
        }

        .customer-support-card-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .customer-support-icon {
          margin-right: 0;
          font-size: 1.6rem;
          color: #ff8c00;
          transition: color 0.3s ease;
        }

        .customer-support-icon:hover {
          color: #ff6a00;
        }

        .customer-support-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .customer-support-card-item {
          margin-bottom: 15px;
          font-size: 1rem;
          color: #555;
          cursor: pointer;
          transition: color 0.3s ease;
          display: block;
          position: relative;
          padding: 10px;
          border-radius: 8px;
          background-color: #efecc4;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        }

        .customer-support-card-item:hover {
          color: #ff8c00;
          background-color: #fdf2e9;
        }

        .customer-support-card-item::after {
          position: absolute;
          right: 10px;
          font-size: 1.2rem;
          color: #333;
          transition: transform 0.3s ease;
        }

        .customer-support-card-item.expanded::after {
          transform: rotate(90deg);
        }

        .customer-support-item-description {
          margin-top: 10px;
          padding: 15px;
          font-size: 0.95rem;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          color: #444;
          line-height: 1.5;
          display: none;
          transition: all 0.3s ease;
        }

        .customer-support-item-description.visible {
          display: block;
        }

        @media (max-width: 768px) {
          .customer-support {
            padding: 2rem;
          }

          .customer-support-grid {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .customer-support-card {
            width: 100%;
            max-width: 350px;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default CustomerSupport;
