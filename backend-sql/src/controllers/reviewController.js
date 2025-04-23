import { pool } from '../config/db.js';

export const getReviewsByBookId = async (req, res) => {
  const { book_id } = req.params;

  try {
    const [reviews] = await pool.query(
      'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.book_id = ?',
      [book_id]
    );

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postReview = async (req, res) => {
  const { book_id } = req.params;
  const { comment } = req.body;

  try {
    // Validate input
    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    // Insert the review into the database
    const [result] = await pool.query(
      'INSERT INTO reviews (book_id, user_id, comment) VALUES (?, ?, ?)',
      [book_id, req.user.id, comment]
    );

    res.status(201).json({
      message: 'Review added successfully',
      review: { id: result.insertId, book_id, user_id: req.user.id, comment },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params; // Use `id` instead of `book_id`
  const { comment } = req.body;

  try {
    // Validate input
    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    // Update the review in the database
    const [result] = await pool.query(
      'UPDATE reviews SET comment = ? WHERE id = ? AND user_id = ?',
      [comment, id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found or not authorized to update' });
    }

    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params; // Use `id` instead of `book_id`

  try {
    // Delete the review from the database
    const [result] = await pool.query(
      'DELETE FROM reviews WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found or not authorized to delete' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


