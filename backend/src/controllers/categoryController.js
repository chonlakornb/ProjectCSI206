import Category from '../models/Category.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoryById = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    await category.save();
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
