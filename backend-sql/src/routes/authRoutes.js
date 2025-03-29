import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: ลงทะเบียนผู้ใช้ใหม่
 *     description: ลงทะเบียนผู้ใช้ใหม่โดยระบุชื่อผู้ใช้ รหัสผ่าน และบทบาท (Role จาก Body ที่ Frontend ส่งไปจะใส่เป็น user เป็น default)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: ชื่อผู้ใช้สำหรับผู้ใช้ใหม่
 *               password:
 *                 type: string
 *                 description: รหัสผ่านสำหรับผู้ใช้ใหม่
 *               role:
 *                 type: string
 *                 description: บทบาทของผู้ใช้ใหม่ (เช่น 'user' หรือ 'admin')
 *     responses:
 *       201:
 *         description: ลงทะเบียนผู้ใช้สำเร็จ
 *       400:
 *         description: ผู้ใช้นี้มีอยู่แล้ว
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: เข้าสู่ระบบผู้ใช้
 *     description: เข้าสู่ระบบโดยระบุชื่อผู้ใช้และรหัสผ่าน หากสำเร็จจะได้รับ JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: ชื่อของผู้ใช้
 *               password:
 *                 type: string
 *                 description: รหัสผ่านของผู้ใช้
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *       400:
 *         description: ข้อมูลรับรองไม่ถูกต้อง
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: ออกจากระบบผู้ใช้
 *     description: ออกจากระบบของผู้ใช้ที่เข้าสู่ระบบอยู่ในขณะนี้ Endpoint นี้ไม่ต้องการ request body
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: ออกจากระบบสำเร็จ
 */
router.post('/logout', logoutUser);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: รีเฟรช JWT token
 *     description: รีเฟรช JWT token โดยระบุ token ปัจจุบัน หากสำเร็จจะได้รับ token ใหม่
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token ปัจจุบัน
 *     responses:
 *       200:
 *         description:  รีเฟรช token สำเร็จ
 *       401:
 *         description: Token ไม่ถูกต้อง
 */
router.post('/refresh', refreshToken);

export default router;
