import express from 'express';
import { getNotifications, addNotification, deleteNotificationById } from '../controllers/notificationController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: ดึงรายการแจ้งเตือนของผู้ใช้
 *     description: ดึงรายการแจ้งเตือนทั้งหมดของผู้ใช้ที่เข้าสู่ระบบ
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: รายการแจ้งเตือน
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.get('/notifications', authMiddleware, getNotifications);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: เพิ่มการแจ้งเตือน
 *     description: เพิ่มการแจ้งเตือนใหม่สำหรับผู้ใช้ (เข้าถึงได้เฉพาะผู้ดูแลระบบ)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: รหัส ID ของผู้ใช้ที่ได้รับการแจ้งเตือน
 *               message:
 *                 type: string
 *                 description: ข้อความของการแจ้งเตือน
 *               status:
 *                 type: string
 *                 description: สถานะของการแจ้งเตือน (เช่น 'unread', 'read')
 *     responses:
 *       201:
 *         description: เพิ่มการแจ้งเตือนสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.post('/notifications', authMiddleware, adminMiddleware, addNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: ลบการแจ้งเตือนโดยใช้ ID
 *     description: ลบการแจ้งเตือนออกจากระบบโดยใช้รหัส ID (เข้าถึงได้เฉพาะผู้ดูแลระบบ)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัส ID ของการแจ้งเตือน
 *     responses:
 *       200:
 *         description: ลบการแจ้งเตือนสำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       404:
 *         description: ไม่พบการแจ้งเตือนที่ต้องการลบ
 */
router.delete('/notifications/:id', authMiddleware, adminMiddleware, deleteNotificationById);


export default router;
