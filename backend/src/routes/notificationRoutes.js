import express from 'express';
import { getNotifications, addNotification, deleteNotificationById } from '../controllers/notificationController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'; // Import auth and admin middleware

const router = express.Router();

router.get('/notifications', authMiddleware, getNotifications); // Add route for fetching user's notifications
router.post('/notifications', authMiddleware, adminMiddleware, addNotification); // Add route for adding a notification (Admin only)
router.delete('/notifications/:id', authMiddleware, adminMiddleware, deleteNotificationById); // Add route for deleting a notification by ID (Admin only)

export default router;
