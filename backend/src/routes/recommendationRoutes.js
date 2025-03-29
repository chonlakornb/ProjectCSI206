import express from 'express';
import { getRecommendations, addRecommendation, deleteRecommendationById } from '../controllers/recommendationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: ดึงรายการหนังสือแนะนำของผู้ใช้
 *     description: ดึงรายการหนังสือที่แนะนำสำหรับผู้ใช้ที่เข้าสู่ระบบ
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: รายการหนังสือแนะนำ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.get('/recommendations', authMiddleware, getRecommendations);

/**
 * @swagger
 * /api/recommendations:
 *   post:
 *     summary: เพิ่มคำแนะนำหนังสือ
 *     description: เพิ่มคำแนะนำหนังสือใหม่สำหรับผู้ใช้ที่เข้าสู่ระบบ
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: string
 *                 description: รหัส ID ของหนังสือที่แนะนำ
 *               reason:
 *                 type: string
 *                 description: เหตุผลที่แนะนำหนังสือเล่มนี้
 *     responses:
 *       201:
 *         description: เพิ่มคำแนะนำสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.post('/recommendations', authMiddleware, addRecommendation);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   delete:
 *     summary: ลบคำแนะนำหนังสือโดยใช้ ID
 *     description: ลบคำแนะนำหนังสือออกจากระบบโดยใช้รหัส ID
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของคำแนะนำหนังสือ
 *     responses:
 *       200:
 *         description: ลบคำแนะนำสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบคำแนะนำที่ต้องการลบ
 */
router.delete('/recommendations/:id', authMiddleware, deleteRecommendationById);


export default router;
