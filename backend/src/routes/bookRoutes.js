import express from 'express';
import { getAllBooks, getBookById, addBook, updateBookById, deleteBookById, searchBooks, filterBooks } from '../controllers/bookController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/books', getAllBooks);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of books matching the search query
 */
router.get('/books/search', searchBooks);

/**
 * @swagger
 * /api/books/filter:
 *   get:
 *     summary: Filter books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Book category
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: Published year
 *     responses:
 *       200:
 *         description: List of books matching the filter criteria
 */
router.get('/books/filter', filterBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get('/books/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               published_year:
 *                 type: number
 *               category:
 *                 type: string
 *               cover_image:
 *                 type: string
 *               pdf_file:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/books', authMiddleware, adminMiddleware, addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               published_year:
 *                 type: number
 *               category:
 *                 type: string
 *               cover_image:
 *                 type: string
 *               pdf_file:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.put('/books/:id', authMiddleware, adminMiddleware, updateBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.delete('/books/:id', authMiddleware, adminMiddleware, deleteBookById);

export default router;
