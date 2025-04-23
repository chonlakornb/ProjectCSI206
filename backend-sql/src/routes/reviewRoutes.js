import express from 'express';
import { getReviewsByBookId, postReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/reviews/:book_id', authMiddleware, getReviewsByBookId);
router.post('/reviews/:book_id', authMiddleware, postReview);
router.put('/reviews/:id', authMiddleware, updateReview); // Use `id` instead of `book_id`
router.delete('/reviews/:id', authMiddleware, deleteReview); // Use `id` instead of `book_id`

/**
 * @swagger
 * /api/reviews/{book_id}:
 *   get:
 *     summary: Get reviews for a specific book
 *     description: Retrieve all reviews for the specified book.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: book_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     responses:
 *       200:
 *         description: List of reviews for the book.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No reviews found for this book.
 */

/**
 * @swagger
 * /api/reviews/{book_id}:
 *   post:
 *     summary: Add a review for a specific book
 *     description: Post a review for the specified book.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: book_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The rating for the book (1-5).
 *               comment:
 *                 type: string
 *                 description: The comment for the book.
 *     responses:
 *       201:
 *         description: Review added successfully.
 *       400:
 *         description: Rating and comment are required.
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/reviews/{book_id}:
 *   put:
 *     summary: Update a review for a specific book
 *     description: Edit an existing review for the specified book.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: book_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The updated rating for the book (1-5).
 *               comment:
 *                 type: string
 *                 description: The updated comment for the book.
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *       400:
 *         description: Rating and comment are required.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Review not found or not authorized to update.
 */

/**
 * @swagger
 * /api/reviews/{book_id}:
 *   delete:
 *     summary: Delete a review for a specific book
 *     description: Remove an existing review for the specified book.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: book_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Review not found or not authorized to delete.
 */

export default router;
