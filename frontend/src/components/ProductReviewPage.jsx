import React, { useState } from 'react';
import Navbar from './Navbar';
import './ProductReviewPage.css';

const ProductReviewPage = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', rating: 5, comment: 'Great product!' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Very useful and affordable.' },
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) return;
    setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const handleIncreaseReviewRating = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id && review.rating < 5
          ? { ...review, rating: review.rating + 1 }
          : review
      )
    );
  };

  return (
    <div className="product-review-page">
      <Navbar />
      {/* Removed Products section */}
      <div className="review-container">
        <h1>Product Reviews</h1>
        <div className="review-list">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <h3>{review.name}</h3>
              <p>Rating: {'⭐'.repeat(review.rating)}</p>
              <p>{review.comment}</p>
              <button onClick={() => handleIncreaseReviewRating(review.id)}>Add Star</button>
            </div>
          ))}
        </div>
        <div className="add-review">
          <h2>Add a Review</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newReview.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
          />
          <textarea
            name="comment"
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={handleInputChange}
          />
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewPage;
