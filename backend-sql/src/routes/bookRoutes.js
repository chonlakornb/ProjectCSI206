import express from 'express';
import { getAllBooks, getBookById, addBook, updateBookById, deleteBookById, searchBooks, filterBooks } from '../controllers/bookController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: รับรายการหนังสือทั้งหมด
 *     description: ดึงรายการหนังสือทั้งหมดในแคตตาล็อก
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: รายการหนังสือทั้งหมด
 */
router.get('/books', getAllBooks);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search books
 *     description: Search books by title or author.
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query.
 *     responses:
 *       200:
 *         description: List of books matching the search query.
 */
router.get('/books/search', searchBooks);

/**
 * @swagger
 * /api/books/filter:
 *   get:
 *     summary: Filter books
 *     description: Filter books by published year.
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: The published year to filter by.
 *     responses:
 *       200:
 *         description: List of books matching the filter criteria.
 */
router.get('/books/filter', filterBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve the details of a book by its ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     responses:
 *       200:
 *         description: Book details.
 *       404:
 *         description: Book not found.
 */
router.get('/books/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the catalog. Only accessible by admin users.
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
 *                 description: The title of the book.
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *               publisher:
 *                 type: string
 *                 description: The publisher of the book.
 *               published_year:
 *                 type: number
 *                 description: The published year of the book.
 *               cover_image:
 *                 type: string
 *                 description: The URL of the cover image of the book.
 *               pdf_file:
 *                 type: string
 *                 description: The URL of the PDF file of the book.
 *     responses:
 *       201:
 *         description: Book added successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/books', authMiddleware, adminMiddleware, addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     description: Update the details of a book by its ID. Only accessible by admin users.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *               publisher:
 *                 type: string
 *                 description: The publisher of the book.
 *               published_year:
 *                 type: number
 *                 description: The published year of the book.
 *               cover_image:
 *                 type: string
 *                 description: The URL of the cover image of the book.
 *               pdf_file:
 *                 type: string
 *                 description: The URL of the PDF file of the book.
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Book not found.
 */
router.put('/books/:id', authMiddleware, adminMiddleware, updateBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Delete a book from the catalog by its ID. Only accessible by admin users.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Book not found.
 */
router.delete('/books/:id', authMiddleware, adminMiddleware, deleteBookById);

export default router;
