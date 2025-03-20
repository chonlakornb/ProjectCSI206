import express from 'express';
import { getAllBooks, getBookById, addBook, updateBookById, deleteBookById, searchBooks, filterBooks } from '../controllers/bookController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'; // Import auth and admin middleware

const router = express.Router();

router.get('/books', getAllBooks); // Add route for fetching all books
router.get('/books/search', searchBooks); // Add route for searching books
router.get('/books/filter', filterBooks); // Add route for filtering books
router.get('/books/:id', getBookById); // Add route for fetching a book by ID
router.post('/books', authMiddleware, adminMiddleware, addBook); // Add route for adding a new book (Admin only)
router.put('/books/:id', authMiddleware, adminMiddleware, updateBookById); // Add route for updating a book by ID (Admin only)
router.delete('/books/:id', authMiddleware, adminMiddleware, deleteBookById); // Add route for deleting a book by ID (Admin only)

export default router;
