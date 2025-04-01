import { pool } from '../config/db.js';

export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Category added successfully', category: { id: result.insertId, name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoryById = async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
