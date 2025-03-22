import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Import auth middleware

const router = express.Router();

router.get('/favorites', authMiddleware, getFavorites); // Add route for fetching user's favorite books
router.post('/favorites/:bookId', authMiddleware, addFavorite); // Add route for adding a book to favorites
router.delete('/favorites/:bookId', authMiddleware, removeFavorite); // Add route for removing a book from favorites

export default router;
