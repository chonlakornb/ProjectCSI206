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
 *         description: รายการหนังสือ
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
 *     summary: คัดกรองหนังสือ
 *     description: คัดกรองหนังสือตามหมวดหมู่ และ/หรือ ปีที่ตีพิมพ์
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: หมวดหมู่ที่ต้องการคัดกรอง
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: ปีที่ตีพิมพ์ที่ต้องการคัดกรอง
 *     responses:
 *       200:
 *         description: รายการหนังสือที่ตรงกับเกณฑ์การคัดกรอง
 */
router.get('/books/filter', filterBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: รับรายละเอียดหนังสือโดยใช้ ID
 *     description: ดึงรายละเอียดของหนังสือโดยใช้ ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหนังสือ
 *     responses:
 *       200:
 *         description: รายละเอียดหนังสือ
 *       404:
 *         description: ไม่พบบันทึกของหนังสือ
 */
router.get('/books/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: เพิ่มหนังสือใหม่
 *     description: เพิ่มหนังสือใหม่ลงในแคตตาล็อก ฟังก์ชันนี้สามารถใช้งานได้เฉพาะผู้ดูแลระบบ (admin) เท่านั้น
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
 *                 description: ชื่อหนังสือ
 *               isbn:
 *                 type: string
 *                 description: หมายเลข ISBN ของหนังสือ
 *               author:
 *                 type: string
 *                 description: ผู้แต่งหนังสือ
 *               publisher:
 *                 type: string
 *                 description: สำนักพิมพ์ของหนังสือ
 *               published_year:
 *                 type: number
 *                 description: ปีที่ตีพิมพ์ของหนังสือ
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของหนังสือ
 *               cover_image:
 *                 type: string
 *                 description: URL ของภาพปกหนังสือ
 *               pdf_file:
 *                 type: string
 *                 description: URL ของไฟล์ PDF หนังสือ
 *     responses:
 *       201:
 *         description: เพิ่มหนังสือสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.post('/books', authMiddleware, adminMiddleware, addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: อัปเดตหนังสือโดยใช้ ID
 *     description: อัปเดตรายละเอียดของหนังสือโดยใช้ ID ฟังก์ชันนี้สามารถใช้งานได้เฉพาะผู้ดูแลระบบ (admin) เท่านั้น
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหนังสือ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: ชื่อหนังสือ
 *               isbn:
 *                 type: string
 *                 description: หมายเลข ISBN ของหนังสือ
 *               author:
 *                 type: string
 *                 description: ผู้แต่งหนังสือ
 *               publisher:
 *                 type: string
 *                 description: สำนักพิมพ์ของหนังสือ
 *               published_year:
 *                 type: number
 *                 description: ปีที่ตีพิมพ์ของหนังสือ
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของหนังสือ
 *               cover_image:
 *                 type: string
 *                 description: URL ของภาพปกหนังสือ
 *               pdf_file:
 *                 type: string
 *                 description: URL ของไฟล์ PDF หนังสือ
 *     responses:
 *       200:
 *         description: อัปเดตหนังสือสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบบันทึกของหนังสือ
 */
router.put('/books/:id', authMiddleware, adminMiddleware, updateBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: ลบหนังสือโดยใช้ ID
 *     description: ลบหนังสือออกจากแคตตาล็อกโดยใช้ ID ฟังก์ชันนี้สามารถใช้งานได้เฉพาะผู้ดูแลระบบ (admin) เท่านั้น
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหนังสือ
 *     responses:
 *       200:
 *         description: ลบหนังสือสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบบันทึกของหนังสือ
 */
router.delete('/books/:id', authMiddleware, adminMiddleware, deleteBookById);


export default router;
