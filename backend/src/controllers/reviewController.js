import Review from '../models/Review.js';

export const getReviewsByBookId = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book_id: bookId }).populate('user_id', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;

  try {
    const newReview = new Review({
      user_id: req.user.id,
      book_id: bookId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this review' });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReviewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
