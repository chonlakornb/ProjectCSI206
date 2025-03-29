import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: ดึงรายการหนังสือที่ผู้ใช้ชื่นชอบ
 *     description: ดึงรายการหนังสือที่ผู้ใช้ที่เข้าสู่ระบบได้ทำเครื่องหมายไว้เป็นรายการโปรด
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: รายการหนังสือที่ผู้ใช้ชื่นชอบ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.get('/favorites', authMiddleware, getFavorites);

/**
 * @swagger
 * /api/favorites/{bookId}:
 *   post:
 *     summary: เพิ่มหนังสือลงในรายการโปรด
 *     description: เพิ่มหนังสือลงในรายการโปรดของผู้ใช้ที่เข้าสู่ระบบ
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหนังสือที่ต้องการเพิ่มในรายการโปรด
 *     responses:
 *       201:
 *         description: เพิ่มหนังสือในรายการโปรดสำเร็จ
 *       400:
 *         description: หนังสือเล่มนี้อยู่ในรายการโปรดแล้ว
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.post('/favorites/:bookId', authMiddleware, addFavorite);

/**
 * @swagger
 * /api/favorites/{bookId}:
 *   delete:
 *     summary: ลบหนังสือออกจากรายการโปรด
 *     description: ลบหนังสือออกจากรายการโปรดของผู้ใช้ที่เข้าสู่ระบบ
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของหนังสือที่ต้องการลบออกจากรายการโปรด
 *     responses:
 *       200:
 *         description: ลบหนังสือออกจากรายการโปรดสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบบันทึกของหนังสือในรายการโปรด
 */
router.delete('/favorites/:bookId', authMiddleware, removeFavorite);


export default router;
