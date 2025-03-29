import express from 'express';
import { getAllCategories, addCategory, updateCategoryById, deleteCategoryById } from '../controllers/categoryController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: รับรายการหมวดหมู่ทั้งหมด
 *     description: ดึงรายการหมวดหมู่ของหนังสือทั้งหมด
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: รายการหมวดหมู่หนังสือ
 */
router.get('/categories', getAllCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: เพิ่มหมวดหมู่ใหม่
 *     description: เพิ่มหมวดหมู่หนังสือใหม่ สามารถใช้งานได้เฉพาะผู้ดูแลระบบ (admin) เท่านั้น
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: ชื่อของหมวดหมู่
 *     responses:
 *       201:
 *         description: เพิ่มหมวดหมู่สำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.post('/categories', authMiddleware, adminMiddleware, addCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: อัปเดตหมวดหมู่โดยใช้ ID
 *     description: อัปเดตชื่อของหมวดหมู่หนังสือโดยใช้ ID ฟังก์ชันนี้สามารถใช้งานได้เฉพาะผู้ดูแลระบบ (admin) เท่านั้น
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหมวดหมู่
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: ชื่อใหม่ของหมวดหมู่
 *     responses:
 *       200:
 *         description: อัปเดตหมวดหมู่สำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบหมวดหมู่
 */
router.put('/categories/:id', authMiddleware, adminMiddleware, updateCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: ลบหมวดหมู่โดยใช้ ID
 *     description: ลบหมวดหมู่หนังสือโดยใช้ ID ฟังก์ชันนี้สามารถใช้งานได้เฉพาะผู้ดูแลระบบ (admin) เท่านั้น
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหมวดหมู่
 *     responses:
 *       200:
 *         description: ลบหมวดหมู่สำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบหมวดหมู่
 */
router.delete('/categories/:id', authMiddleware, adminMiddleware, deleteCategoryById);


export default router;
