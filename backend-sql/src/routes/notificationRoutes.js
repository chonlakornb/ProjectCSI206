import express from 'express';
import { getNotifications, addNotification, deleteNotificationById, getNotificationById } from '../controllers/notificationController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getNotifications);
router.get('/:id', authenticate, getNotificationById); // Add route for fetching a specific notification
router.post('/', authenticate, addNotification);
router.delete('/:id', authenticate, deleteNotificationById);

export default router;
