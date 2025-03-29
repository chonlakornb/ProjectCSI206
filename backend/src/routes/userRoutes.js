import express from 'express';
import { getUsers, getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ดึงรายชื่อผู้ใช้ทั้งหมด
 *     description: ดึงรายชื่อของผู้ใช้ที่ลงทะเบียนทั้งหมดในระบบ
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: รายชื่อผู้ใช้ทั้งหมด
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: ดึงข้อมูลโปรไฟล์ผู้ใช้
 *     description: ดึงข้อมูลโปรไฟล์ของผู้ใช้ที่เข้าสู่ระบบในขณะนั้น
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ข้อมูลโปรไฟล์ผู้ใช้
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.get('/users/me', authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: อัปเดตโปรไฟล์ผู้ใช้
 *     description: อัปเดตข้อมูลโปรไฟล์ของผู้ใช้ที่เข้าสู่ระบบ ข้อมูลที่สามารถอัปเดตได้ ได้แก่ ชื่อผู้ใช้ รหัสผ่าน และบทบาท
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: ชื่อผู้ใช้ใหม่ของผู้ใช้
 *               password:
 *                 type: string
 *                 description: รหัสผ่านใหม่ของผู้ใช้
 *               role:
 *                 type: string
 *                 description: บทบาทใหม่ของผู้ใช้
 *     responses:
 *       200:
 *         description: อัปเดตโปรไฟล์ผู้ใช้สำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.put('/users/me', authMiddleware, updateUserProfile);

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: ลบโปรไฟล์ผู้ใช้
 *     description: ลบบัญชีผู้ใช้ของผู้ใช้ที่เข้าสู่ระบบในขณะนั้น
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ลบบัญชีผู้ใช้สำเร็จ
 *       401:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */
router.delete('/users/me', authMiddleware, deleteUserProfile);


export default router;
