import React from 'react';
import './Reviews.css';

const Reviews = () => {
  const mockReviews = [
    {
      id: 1,
      name: 'John Doe',
      review: 'The service was excellent! Highly recommend for any event.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      review: 'Beautiful decorations and professional staff. Loved it!',
      rating: 4,
    },
    {
      id: 3,
      name: 'Michael Brown',
      review: 'The photography was outstanding. Great value for money!',
      rating: 5,
    },
  ];

  return (
    <section className="reviews">
      <h2>What Our Customers Say</h2>
      <div className="reviews-grid">
        {mockReviews.map((review) => (
          <div key={review.id} className="review-card">
            <p className="review-text">"{review.review}"</p>
            <p className="review-name">- {review.name}</p>
            <p className="review-rating">Rating: {review.rating} ★</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
