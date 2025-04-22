import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllBooks, getBookById, addBook, updateBookById, deleteBookById, searchBooks, filterBooks } from '../controllers/bookController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Serve the uploads folder as static content
router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'cover_image') { // Ensure this matches the frontend field name
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }
  },
});

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
 *     summary: ค้นหาหนังสือ
 *     description: ค้นหาหนังสือโดยใช้ชื่อหนังสือ, ผู้แต่ง หรือหมวดหมู่
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: คำค้นหาหนังสือ
 *     responses:
 *       200:
 *         description: รายการหนังสือที่ตรงกับคำค้นหา
 */
router.get('/books/search', searchBooks);

/**
 * @swagger
 * /api/books/filter:
 *   get:
 *     summary: Filter หนังสือ
 *     description: Filter หนังสือตามหมวดหมู่ และ/หรือ ปีที่ตีพิมพ์
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category to filter by.
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
 *               category:
 *                 type: string
 *                 description: The category of the book.
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
router.post('/books', authMiddleware, adminMiddleware, upload.single('cover_image'), addBook);

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
 *               category:
 *                 type: string
 *                 description: The category of the book.
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
router.put('/books/:id', authMiddleware, adminMiddleware, upload.single('cover_image'), updateBookById);

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
