import express from 'express';
import { getAllCategories, addCategory, updateCategoryById, deleteCategoryById } from '../controllers/categoryController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'; // Import auth and admin middleware

const router = express.Router();

router.get('/categories', getAllCategories); // Add route for fetching all categories
router.post('/categories', authMiddleware, adminMiddleware, addCategory); // Add route for adding a category (Admin only)
router.put('/categories/:id', authMiddleware, adminMiddleware, updateCategoryById); // Add route for updating a category by ID (Admin only)
router.delete('/categories/:id', authMiddleware, adminMiddleware, deleteCategoryById); // Add route for deleting a category by ID (Admin only)

export default router;
