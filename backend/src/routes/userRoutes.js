import express from 'express';
import { getUsers, getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Import auth middleware

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/me', authMiddleware, getUserProfile); // Add route for user profile
router.put('/users/me', authMiddleware, updateUserProfile); // Add route for updating user profile
router.delete('/users/me', authMiddleware, deleteUserProfile); // Add route for deleting user profile

export default router;
