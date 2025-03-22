import express from 'express';
import { getReviewsByBookId, addReview, updateReviewById, deleteReviewById } from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Import auth middleware

const router = express.Router();

router.get('/reviews/:bookId', getReviewsByBookId); // Add route for fetching all reviews of a book by its ID
router.post('/reviews/:bookId', authMiddleware, addReview); // Add route for adding a review to a book by its ID
router.put('/reviews/:reviewId', authMiddleware, updateReviewById); // Add route for updating a review by its ID
router.delete('/reviews/:reviewId', authMiddleware, deleteReviewById); // Add route for deleting a review by its ID

export default router;
