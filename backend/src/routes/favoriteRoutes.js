import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get user's favorite books
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite books
 *       401:
 *         description: Unauthorized
 */
router.get('/favorites', authMiddleware, getFavorites);

/**
 * @swagger
 * /api/favorites/{bookId}:
 *   post:
 *     summary: Add a book to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       201:
 *         description: Book added to favorites
 *       400:
 *         description: Book is already in favorites
 *       401:
 *         description: Unauthorized
 */
router.post('/favorites/:bookId', authMiddleware, addFavorite);

/**
 * @swagger
 * /api/favorites/{bookId}:
 *   delete:
 *     summary: Remove a book from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book removed from favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found in favorites
 */
router.delete('/favorites/:bookId', authMiddleware, removeFavorite);

export default router;
