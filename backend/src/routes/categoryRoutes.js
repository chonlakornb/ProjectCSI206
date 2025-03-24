import express from 'express';
import { getAllCategories, addCategory, updateCategoryById, deleteCategoryById } from '../controllers/categoryController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all book categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories.
 */
router.get('/categories', getAllCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Add a new category
 *     description: Add a new book category. Only accessible by admin users.
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
 *                 description: The name of the category.
 *     responses:
 *       201:
 *         description: Category added successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/categories', authMiddleware, adminMiddleware, addCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Update the name of a book category by its ID. Only accessible by admin users.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category.
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Category not found.
 */
router.put('/categories/:id', authMiddleware, adminMiddleware, updateCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Delete a book category by its ID. Only accessible by admin users.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category.
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Category not found.
 */
router.delete('/categories/:id', authMiddleware, adminMiddleware, deleteCategoryById);

export default router;
